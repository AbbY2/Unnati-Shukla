'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { irisVertex, irisFragment, glowVertex, glowFragment } from './shaders';

const COLORS = {
  a: new THREE.Color('#0E4D92'),
  b: new THREE.Color('#38E1FF'),
  c: new THREE.Color('#7A5CFF'),
};

function Iris({ pupil = 0.34 }: { pupil?: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: COLORS.a },
      uColorB: { value: COLORS.b },
      uColorC: { value: COLORS.c },
      uPupil: { value: pupil },
    }),
    [pupil]
  );
  useFrame((_, dt) => {
    if (mat.current) mat.current.uniforms.uTime.value += dt;
  });
  return (
    <mesh>
      <circleGeometry args={[2, 128]} />
      <shaderMaterial
        ref={mat}
        vertexShader={irisVertex}
        fragmentShader={irisFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function Glow({
  color,
  scale,
  intensity,
  z = -0.2,
}: {
  color: THREE.Color;
  scale: number;
  intensity: number;
  z?: number;
}) {
  const uniforms = useMemo(
    () => ({ uColor: { value: color }, uIntensity: { value: intensity } }),
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

function Particles({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // distribute in a disk/torus around the eye
      const radius = 2.4 + Math.random() * 4.5;
      const angle = Math.random() * Math.PI * 2;
      const zSpread = (Math.random() - 0.5) * 3.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.7;
      positions[i * 3 + 2] = zSpread - 1;
      sizes[i] = Math.random() * 0.05 + 0.008;
    }
    return { positions, sizes };
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#8fe6ff"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame(() => {
    if (!group.current) return;
    // mouse parallax + gentle idle float
    const targetX = pointer.y * 0.18;
    const targetY = pointer.x * 0.22;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05;
  });
  return <group ref={group}>{children}</group>;
}

export default function EyeScene({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6], fov: 42 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <Rig>
            <Glow color={COLORS.c} scale={7} intensity={0.5} z={-1.4} />
            <Glow color={COLORS.b} scale={4.6} intensity={0.7} z={-0.6} />
            <Iris pupil={0.34} />
            <Glow color={COLORS.b} scale={1.3} intensity={0.9} z={0.2} />
            <Particles />
          </Rig>
        </Suspense>
      </Canvas>
    </div>
  );
}
