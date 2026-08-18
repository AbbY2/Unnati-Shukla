'use client';

import { useEffect, useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { glowVertex, glowFragment } from './shaders';

// ── Constellation shader: particles assemble from a scattered cloud into an eye ──
const pointsVertex = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;   // 0 = scattered, 1 = eye
  uniform float uSize;
  uniform float uPixelRatio;
  attribute vec3 aOffset;    // scattered start position
  attribute vec3 aColor;
  attribute float aScale;
  varying vec3 vColor;
  varying float vTw;

  void main() {
    vColor = aColor;

    // gentle breathing of the whole iris
    vec3 target = position;
    target.xy *= 1.0 + 0.02 * sin(uTime * 0.7);

    vec3 pos = mix(aOffset, target, uProgress);

    // twinkle
    float phase = aOffset.x * 7.0 + aOffset.y * 5.0;
    float tw = 0.55 + 0.45 * sin(uTime * 2.0 + phase);
    vTw = tw;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * uSize * tw * uPixelRatio / -mv.z;
  }
`;

const pointsFragment = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vTw;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float glow = pow(smoothstep(0.5, 0.0, d), 1.7);
    gl_FragColor = vec4(vColor * glow * (0.75 + 0.6 * vTw), glow);
  }
`;

const IRIS_R = 2.3;
const PUPIL_R = 0.72;

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

function ConstellationEye() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const start = useRef<number | null>(null);

  const { geometry, uniforms } = useMemo(() => {
    const COUNT = 5400;
    const position = new Float32Array(COUNT * 3);
    const aOffset = new Float32Array(COUNT * 3);
    const aColor = new Float32Array(COUNT * 3);
    const aScale = new Float32Array(COUNT);

    const cyan = new THREE.Color('#4fe3ff');
    const violet = new THREE.Color('#8b6bff');
    const emerald = new THREE.Color('#2fe6ad');
    const white = new THREE.Color('#eaffff');
    const c = new THREE.Color();

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      let x = 0,
        y = 0,
        z = 0,
        size = 1;

      const roll = i / COUNT;
      if (roll < 0.8) {
        // iris annulus — denser toward pupil edge and outer rim (radial fibres)
        const angle = Math.random() * Math.PI * 2;
        const t = Math.random();
        const r = PUPIL_R + (IRIS_R - PUPIL_R) * Math.pow(t, 0.85);
        // subtle fibre clumping
        const fibre = 0.04 * Math.sin(angle * 90.0);
        x = Math.cos(angle) * (r + fibre);
        y = Math.sin(angle) * (r + fibre);
        z = (Math.random() - 0.5) * 0.28;
        const rr = (r - PUPIL_R) / (IRIS_R - PUPIL_R);
        c.copy(cyan).lerp(violet, rr * rr);
        if (Math.random() < 0.05) c.copy(emerald);
        size = 0.7 + Math.random() * 1.5 + rr * 0.8;
      } else if (roll < 0.87) {
        // bright pupil rim
        const angle = Math.random() * Math.PI * 2;
        const r = PUPIL_R + Math.random() * 0.06;
        x = Math.cos(angle) * r;
        y = Math.sin(angle) * r;
        z = (Math.random() - 0.5) * 0.1;
        c.copy(cyan).lerp(white, 0.5);
        size = 1.0 + Math.random() * 1.4;
      } else if (roll < 0.9) {
        // specular catchlight cluster (upper-right)
        const a = Math.random() * Math.PI * 2;
        const rr = Math.random() * 0.28;
        x = 0.55 + Math.cos(a) * rr;
        y = 0.6 + Math.sin(a) * rr;
        z = 0.3 + Math.random() * 0.1;
        c.copy(white);
        size = 1.2 + Math.random() * 1.8;
      } else {
        // outer star field for depth
        const angle = Math.random() * Math.PI * 2;
        const r = IRIS_R + Math.random() * IRIS_R * 1.9;
        x = Math.cos(angle) * r;
        y = Math.sin(angle) * r * 0.82;
        z = (Math.random() - 0.5) * 2.2 - 0.6;
        c.copy(Math.random() < 0.5 ? cyan : violet).multiplyScalar(0.6);
        size = 0.5 + Math.random() * 1.0;
      }

      position[i3] = x;
      position[i3 + 1] = y;
      position[i3 + 2] = z;

      // scattered start — a wide cloud that collapses into the eye
      const sr = 3.5 + Math.random() * 4;
      const sa = Math.random() * Math.PI * 2;
      const sp = Math.acos(2 * Math.random() - 1);
      aOffset[i3] = Math.sin(sp) * Math.cos(sa) * sr;
      aOffset[i3 + 1] = Math.sin(sp) * Math.sin(sa) * sr * 0.7;
      aOffset[i3 + 2] = Math.cos(sp) * sr - 2;

      aColor[i3] = c.r;
      aColor[i3 + 1] = c.g;
      aColor[i3 + 2] = c.b;
      aScale[i] = size;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
    geometry.setAttribute('aOffset', new THREE.BufferAttribute(aOffset, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(aColor, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(aScale, 1));

    const uniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uSize: { value: 26 },
      uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
    };

    return { geometry, uniforms };
  }, []);

  useFrame((state) => {
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime;
    if (mat.current) {
      mat.current.uniforms.uTime.value = t;
      const p = Math.min(1, (t - start.current) / 2.4);
      mat.current.uniforms.uProgress.value = easeOutCubic(p);
    }
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={mat}
        vertexShader={pointsVertex}
        fragmentShader={pointsFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Glow({
  color,
  scale,
  intensity,
  z = -0.4,
}: {
  color: string;
  scale: number;
  intensity: number;
  z?: number;
}) {
  const uniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color(color) }, uIntensity: { value: intensity } }),
    [color, intensity]
  );
  return (
    <mesh position={[0, 0, z]} scale={scale}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={glowVertex}
        fragmentShader={glowFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// The eye follows the cursor anywhere on screen (glance + turn). Uses a
// window listener so it tracks even when the pointer is over the headline.
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const { x, y } = mouse.current;
    // glance: the iris drifts toward the cursor (bounded)
    const px = x * 0.55;
    const py = y * 0.4;
    g.position.x += (px - g.position.x) * 0.08;
    g.position.y += (py - g.position.y) * 0.08;
    // turn: the eye rotates to face the cursor
    const rx = -y * 0.3;
    const ry = x * 0.38;
    g.rotation.x += (rx - g.rotation.x) * 0.08;
    g.rotation.y += (ry - g.rotation.y) * 0.08;
    g.rotation.z = state.clock.elapsedTime * 0.008;
  });

  return <group ref={group}>{children}</group>;
}

export default function ParticleEye({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6], fov: 42 }}
      >
        <Suspense fallback={null}>
          <Glow color="#7a5cff" scale={7} intensity={0.4} z={-1.6} />
          <Glow color="#38e1ff" scale={4.4} intensity={0.55} z={-0.8} />
          <Rig>
            <ConstellationEye />
          </Rig>
        </Suspense>
      </Canvas>
    </div>
  );
}
