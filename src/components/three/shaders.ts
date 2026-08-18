// Procedural iris / retina shader — no textures, fully generated in GLSL.

export const irisVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPos;
  void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const irisFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColorA; // deep blue
  uniform vec3 uColorB; // cyan
  uniform vec3 uColorC; // purple
  uniform float uPupil; // pupil radius 0..1

  // hash + noise
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
               mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
  }

  void main() {
    vec2 c = vUv - 0.5;
    float r = length(c) * 2.0;      // 0 center -> 1 edge
    float a = atan(c.y, c.x);

    // radial fibres of the iris
    float fibers = sin(a * 120.0 + noise(vec2(a*8.0, r*6.0)) * 6.0);
    fibers = smoothstep(0.0, 1.0, 0.5 + 0.5 * fibers);
    float radialFade = smoothstep(1.05, uPupil, r);

    // crypts / texture
    float n = noise(vec2(a * 26.0, r * 20.0 - uTime * 0.15));

    // colour mix from centre outward
    vec3 col = mix(uColorB, uColorA, smoothstep(uPupil, 0.85, r));
    col = mix(col, uColorC, pow(smoothstep(0.2, 1.0, r), 2.0) * 0.6);
    col += fibers * radialFade * 0.28 * mix(uColorB, uColorC, r);
    col *= 0.6 + 0.6 * n;

    // pupil — deep, glowing rim
    float pupil = smoothstep(uPupil, uPupil - 0.04, r);
    vec3 pupilCol = vec3(0.01, 0.02, 0.05);
    float rim = smoothstep(uPupil + 0.02, uPupil, r) - smoothstep(uPupil, uPupil - 0.02, r);
    col = mix(col, pupilCol, pupil);
    col += rim * uColorB * 1.4;

    // central retina glow that pulses (light into life)
    float pulse = 0.5 + 0.5 * sin(uTime * 1.2);
    float glow = smoothstep(uPupil + 0.35, 0.0, r);
    col += glow * mix(uColorB, uColorC, 0.5) * (0.25 + 0.35 * pulse);

    // limbus dark ring at outer edge
    float limbus = smoothstep(0.98, 0.86, r);
    col *= 0.35 + 0.65 * limbus;

    // vignette to blend into scene
    float edge = smoothstep(1.02, 0.7, r);
    gl_FragColor = vec4(col, edge);
  }
`;

// Additive glow sprite shader (soft radial falloff)
export const glowVertex = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

export const glowFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uIntensity;
  void main(){
    float d = length(vUv - 0.5) * 2.0;
    float a = smoothstep(1.0, 0.0, d);
    a = pow(a, 2.2) * uIntensity;
    gl_FragColor = vec4(uColor, a);
  }
`;
