"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PAGE_WIDTH = 1.48;
const PAGE_HEIGHT = 1.34;
const PAGE_COUNT = 6;
const OPEN_DURATION = 1.85;
const TURN_DURATION = 1.05;
const PAGE_STAGGER = 1.1;
const TURN_SEQUENCE = (PAGE_COUNT - 1) * PAGE_STAGGER + TURN_DURATION;
const RESET_DURATION = 2.8;
const LOOP_DURATION = TURN_SEQUENCE + RESET_DURATION;
const GRID_X = 22;
const GRID_Y = 18;

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(value: number) {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

function pagePoint(side: -1 | 1, u: number, v: number, zOffset = 0) {
  const x = side * u * PAGE_WIDTH;
  const y = (v - 0.5) * PAGE_HEIGHT + u * 0.085;
  const z = 0.055 + u * 0.34 + Math.sin(u * Math.PI) * 0.14 + Math.sin(v * Math.PI) * 0.028 + zOffset;
  return new THREE.Vector3(x, y, z);
}

function makePageGeometry(side: -1 | 1, zOffset = 0) {
  const positions = new Float32Array((GRID_X + 1) * (GRID_Y + 1) * 3);
  const indices: number[] = [];
  let vertex = 0;

  for (let iy = 0; iy <= GRID_Y; iy += 1) {
    const v = iy / GRID_Y;
    for (let ix = 0; ix <= GRID_X; ix += 1) {
      const u = ix / GRID_X;
      const point = pagePoint(side, u, v, zOffset);
      positions[vertex++] = point.x;
      positions[vertex++] = point.y;
      positions[vertex++] = point.z;
    }
  }

  for (let iy = 0; iy < GRID_Y; iy += 1) {
    for (let ix = 0; ix < GRID_X; ix += 1) {
      const a = iy * (GRID_X + 1) + ix;
      const b = a + 1;
      const c = a + GRID_X + 1;
      const d = c + 1;
      if (side === 1) indices.push(a, b, c, b, d, c);
      else indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function makeNodeGeometry(side: -1 | 1) {
  const positions: number[] = [];
  for (let iy = 1; iy < GRID_Y; iy += 3) {
    for (let ix = 1; ix < GRID_X; ix += 3) {
      const point = pagePoint(side, ix / GRID_X, iy / GRID_Y, 0.012);
      positions.push(point.x, point.y, point.z);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

function makePageEdgeCurves(side: -1 | 1) {
  const top = new THREE.CatmullRomCurve3([
    pagePoint(side, 0, 1),
    pagePoint(side, 0.3, 1),
    pagePoint(side, 0.68, 1),
    pagePoint(side, 1, 1)
  ]);
  const bottom = new THREE.CatmullRomCurve3([
    pagePoint(side, 0, 0),
    pagePoint(side, 0.3, 0),
    pagePoint(side, 0.68, 0),
    pagePoint(side, 1, 0)
  ]);
  const outer = new THREE.CatmullRomCurve3([
    pagePoint(side, 1, 0),
    pagePoint(side, 1, 0.35),
    pagePoint(side, 1, 0.68),
    pagePoint(side, 1, 1)
  ]);
  const hinge = new THREE.CatmullRomCurve3([
    pagePoint(side, 0, 0),
    pagePoint(side, 0, 0.35),
    pagePoint(side, 0, 0.68),
    pagePoint(side, 0, 1)
  ]);
  return [top, bottom, outer, hinge];
}

function PageNetwork({ side, geometry, opacity = 0.72 }: { side: -1 | 1; geometry: THREE.BufferGeometry; opacity?: number }) {
  const nodes = useMemo(() => makeNodeGeometry(side), [side]);
  const edges = useMemo(() => makePageEdgeCurves(side), [side]);

  return (
    <group>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#15b8f3"
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#9dfaff"
          wireframe
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <points geometry={nodes}>
        <pointsMaterial
          color="#b8ffff"
          size={0.018}
          sizeAttenuation
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      {edges.map((curve, index) => (
        <mesh key={index}>
          <tubeGeometry args={[curve, 32, index === 3 ? 0.004 : 0.006, 5, false]} />
          <meshBasicMaterial
            color={index === 2 ? "#4deaff" : "#a6ffff"}
            transparent
            opacity={index === 3 ? 0.46 : 0.86}
          />
        </mesh>
      ))}
    </group>
  );
}

function FixedPage({ side }: { side: -1 | 1 }) {
  const geometry = useMemo(() => makePageGeometry(side, 0), [side]);
  return <PageNetwork side={side} geometry={geometry} opacity={0.76} />;
}

function TurningPage({ index }: { index: number }) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => makePageGeometry(1, 0.008 + index * 0.005), [index]);
  const basePositions = useMemo(() => {
    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    return new Float32Array(attribute.array as Float32Array);
  }, [geometry]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const afterOpening = Math.max(0, clock.elapsedTime - OPEN_DURATION - 0.16);
    const cycle = afterOpening % LOOP_DURATION;
    let angle = 0;
    let curl = 0;

    if (cycle < TURN_SEQUENCE) {
      const start = index * PAGE_STAGGER;
      const raw = (cycle - start) / TURN_DURATION;
      angle = Math.PI * smoothstep(raw);
      if (raw >= 0 && raw <= 1) curl = Math.sin(raw * Math.PI);
    } else {
      const resetTime = cycle - TURN_SEQUENCE;
      const resetStart = (PAGE_COUNT - 1 - index) * 0.36;
      const raw = (resetTime - resetStart) / 0.72;
      angle = Math.PI * (1 - smoothstep(raw));
      if (raw >= 0 && raw <= 1) curl = Math.sin(raw * Math.PI) * 0.72;
    }

    group.current.rotation.y = angle;
    group.current.position.z = 0.006 + index * 0.004;

    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const current = attribute.array as Float32Array;
    for (let i = 0; i < current.length; i += 3) {
      const u = clamp01(basePositions[i] / PAGE_WIDTH);
      current[i] = basePositions[i] - u * u * curl * 0.055;
      current[i + 1] = basePositions[i + 1] + Math.sin(u * Math.PI) * curl * 0.035;
      current[i + 2] = basePositions[i + 2] + Math.sin(u * Math.PI) * curl * 0.22;
    }
    attribute.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <group ref={group}>
      <PageNetwork side={1} geometry={geometry} opacity={0.5} />
    </group>
  );
}

function BookCover({ side }: { side: -1 | 1 }) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => makePageGeometry(side, -0.055), [side]);

  useFrame(({ clock }) => {
    const open = smoothstep(clock.elapsedTime / OPEN_DURATION);
    if (group.current) group.current.rotation.y = -side * 1.12 * (1 - open);
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#08749e"
          metalness={0.55}
          roughness={0.22}
          clearcoat={1}
          emissive="#075d88"
          emissiveIntensity={0.48}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#43e9ff" wireframe transparent opacity={0.22} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
}

function PageStack() {
  const lines = useMemo(() => {
    return Array.from({ length: 8 }, (_, index) => {
      const depth = index * 0.013;
      return new THREE.CatmullRomCurve3([
        new THREE.Vector3(-PAGE_WIDTH, -0.59 - depth * 0.2, 0.35 - depth),
        new THREE.Vector3(-0.93, -0.645 - depth, 0.27 - depth),
        new THREE.Vector3(0, -0.66 - depth, 0.24 - depth),
        new THREE.Vector3(0.93, -0.645 - depth, 0.27 - depth),
        new THREE.Vector3(PAGE_WIDTH, -0.59 - depth * 0.2, 0.35 - depth)
      ]);
    });
  }, []);

  return (
    <group>
      {lines.map((curve, index) => (
        <mesh key={index}>
          <tubeGeometry args={[curve, 46, 0.0045, 4, false]} />
          <meshBasicMaterial
            color={index % 3 === 0 ? "#a5ffff" : index % 3 === 1 ? "#47cfff" : "#258aff"}
            transparent
            opacity={0.68 - index * 0.045}
          />
        </mesh>
      ))}
      <mesh position={[0, -0.67, 0.28]}>
        <boxGeometry args={[0.1, 0.04, 0.12]} />
        <meshStandardMaterial color="#24e5e6" emissive="#27d9ea" emissiveIntensity={1.8} metalness={0.82} roughness={0.22} />
      </mesh>
    </group>
  );
}

function FloatingKnowledgeBook() {
  const root = useRef<THREE.Group>(null);
  const { size, pointer } = useThree();

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    const compact = size.width < 560;
    const opening = smoothstep(time / OPEN_DURATION);

    if (root.current) {
      root.current.position.set(0, Math.sin(time * 0.62) * 0.065 - 0.02, 0);
      root.current.scale.setScalar((compact ? 0.9 : 1.17) * (0.74 + opening * 0.26));
      root.current.rotation.x = -0.25 + Math.sin(time * 0.34) * 0.032 - pointer.y * 0.035;
      root.current.rotation.y = Math.sin(time * 0.24) * 0.13 + time * 0.018 + pointer.x * 0.105;
      root.current.rotation.z = Math.sin(time * 0.31) * 0.035;
    }
  });

  return (
    <group ref={root}>
      <mesh position={[0, -0.03, -0.11]}>
        <boxGeometry args={[0.13, PAGE_HEIGHT + 0.16, 0.13]} />
        <meshStandardMaterial color="#087c9a" metalness={0.88} roughness={0.23} emissive="#087d95" emissiveIntensity={1.6} />
      </mesh>

      <FixedPage side={-1} />
      <FixedPage side={1} />
      {Array.from({ length: PAGE_COUNT }).map((_, index) => (
        <TurningPage key={index} index={index} />
      ))}
      <BookCover side={-1} />
      <BookCover side={1} />
      <PageStack />

      <pointLight position={[0, 0.18, 0.58]} color="#49f3ff" intensity={4.3} distance={3.8} />
      <pointLight position={[-0.85, 0.3, 0.14]} color="#168cff" intensity={2.7} distance={3.1} />
      <pointLight position={[0.85, 0.5, 0.2]} color="#70fff1" intensity={2.2} distance={3} />
    </group>
  );
}

function AmbientParticles() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(520 * 3);
    for (let i = 0; i < 520; i += 1) {
      positions[i * 3] = Math.sin(i * 12.9898) * 3.8;
      positions[i * 3 + 1] = Math.cos(i * 7.233) * 2.6;
      positions[i * 3 + 2] = Math.sin(i * 4.723) * 2.0 - 0.5;
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return result;
  }, []);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.elapsedTime * 0.009;
      points.current.rotation.z = Math.sin(clock.elapsedTime * 0.06) * 0.012;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color="#54e8ec"
        size={0.012}
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
}

function KnowledgeParticleStream() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(96 * 3);
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return result;
  }, []);
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.15, -0.06, 0.2),
    new THREE.Vector3(-0.82, 0.2, 0.36),
    new THREE.Vector3(-0.35, 0.52, 0.52),
    new THREE.Vector3(0.28, 0.61, 0.25),
    new THREE.Vector3(0.88, 0.42, -0.1),
    new THREE.Vector3(1.12, 0.18, -0.2)
  ]), []);

  useFrame(({ clock }) => {
    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const positions = attribute.array as Float32Array;
    const time = clock.elapsedTime * 0.075;
    const count = positions.length / 3;
    for (let i = 0; i < count; i += 1) {
      const t = (i / count + time) % 1;
      const point = curve.getPoint(t);
      positions[i * 3] = point.x + Math.sin(t * Math.PI * 8 + clock.elapsedTime) * 0.015;
      positions[i * 3 + 1] = point.y + Math.cos(t * Math.PI * 6 + clock.elapsedTime * 1.2) * 0.018;
      positions[i * 3 + 2] = point.z + Math.sin(t * Math.PI * 7 + clock.elapsedTime) * 0.014;
    }
    attribute.needsUpdate = true;
  });

  return (
    <>
      <mesh>
        <tubeGeometry args={[curve, 56, 0.003, 5, false]} />
        <meshBasicMaterial color="#65f9ed" transparent opacity={0.2} />
      </mesh>
      <points ref={points} geometry={geometry}>
        <pointsMaterial
          color="#b7ffff"
          size={0.02}
          sizeAttenuation
          transparent
          opacity={0.88}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

function HologramFloor() {
  const floor = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (floor.current) floor.current.rotation.z = clock.elapsedTime * 0.022;
  });

  return (
    <group ref={floor} position={[0, -1.22, -0.55]} scale={[1.35, 0.24, 1]}>
      <mesh>
        <torusGeometry args={[1.22, 0.0035, 6, 120]} />
        <meshBasicMaterial color="#4ae8e7" transparent opacity={0.23} />
      </mesh>
      <mesh rotation={[0, 0, 0.78]} scale={[1.24, 1, 1]}>
        <torusGeometry args={[1.22, 0.0025, 6, 120]} />
        <meshBasicMaterial color="#448cff" transparent opacity={0.19} />
      </mesh>
    </group>
  );
}

function SceneContents() {
  return (
    <>
      <ambientLight intensity={0.74} />
      <pointLight position={[2.2, 2.7, 3.8]} color="#5ceeff" intensity={30} distance={8} />
      <pointLight position={[-3, -1.2, 1.4]} color="#327cff" intensity={17} distance={8} />
      <pointLight position={[0, 2.2, -2]} color="#2b9dff" intensity={10} distance={7} />
      <AmbientParticles />
      <FloatingKnowledgeBook />
      <KnowledgeParticleStream />
      <HologramFloor />
    </>
  );
}

export default function GrowthScene() {
  return (
    <Canvas
      className="growth-canvas"
      camera={{ position: [0, 0, 5.65], fov: 38 }}
      dpr={[1, 1.35]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#000000", 0);
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <SceneContents />
    </Canvas>
  );
}
