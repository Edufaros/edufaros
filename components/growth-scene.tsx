"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.42;
const PAGE_COUNT = 7;
const OPEN_DURATION = 1.9;
const TURN_DURATION = 1.34;
const PAGE_STAGGER = 1.72;
const TURN_SEQUENCE = (PAGE_COUNT - 1) * PAGE_STAGGER + TURN_DURATION;
const RESET_DURATION = 2.8;
const LOOP_DURATION = TURN_SEQUENCE + RESET_DURATION;
const GRID_X = 20;
const GRID_Y = 16;

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(value: number) {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

function makePageGeometry(side: -1 | 1, zOffset = 0) {
  const positions = new Float32Array((GRID_X + 1) * (GRID_Y + 1) * 3);
  const indices: number[] = [];
  let vertex = 0;

  for (let iy = 0; iy <= GRID_Y; iy += 1) {
    const v = iy / GRID_Y;
    const y = (v - 0.5) * PAGE_HEIGHT;
    for (let ix = 0; ix <= GRID_X; ix += 1) {
      const u = ix / GRID_X;
      const x = side * u * PAGE_WIDTH;
      const liftedEdge = Math.pow(Math.abs(v - 0.5) * 2, 2) * 0.024;
      const pageArch = Math.sin(u * Math.PI) * 0.048;
      positions[vertex++] = x;
      positions[vertex++] = y;
      positions[vertex++] = 0.035 + pageArch + liftedEdge + zOffset;
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

function PageDetails({ side, z = 0.12 }: { side: -1 | 1; z?: number }) {
  const rows = [
    { y: 0.43, width: 0.64, color: "#c9ffff", opacity: 0.98, height: 0.013 },
    { y: 0.32, width: 0.76, color: "#59e7ee", opacity: 0.82, height: 0.006 },
    { y: 0.23, width: 0.52, color: "#75efff", opacity: 0.72, height: 0.005 },
    { y: 0.12, width: 0.69, color: "#58c9ff", opacity: 0.78, height: 0.006 },
    { y: 0.02, width: 0.62, color: "#83fff1", opacity: 0.66, height: 0.005 },
    { y: -0.08, width: 0.75, color: "#50d9f7", opacity: 0.76, height: 0.006 },
    { y: -0.18, width: 0.47, color: "#9cfff7", opacity: 0.7, height: 0.005 },
    { y: -0.29, width: 0.65, color: "#50bbff", opacity: 0.7, height: 0.005 },
    { y: -0.39, width: 0.38, color: "#67f3e8", opacity: 0.78, height: 0.006 }
  ];

  return (
    <group>
      {rows.map((row, index) => (
        <mesh
          key={index}
          position={[side * PAGE_WIDTH * 0.53, row.y, z + (index % 2) * 0.001]}
        >
          <boxGeometry args={[row.width * 0.76, row.height, 0.002]} />
          <meshBasicMaterial color={row.color} transparent opacity={row.opacity} />
        </mesh>
      ))}
      <mesh position={[side * PAGE_WIDTH * 0.34, 0.02, z + 0.004]}>
        <boxGeometry args={[0.22, 0.38, 0.002]} />
        <meshBasicMaterial color="#139cc5" transparent opacity={0.12} />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[side * PAGE_WIDTH * (0.18 + i * 0.1), -0.48, z + 0.004]}>
          <boxGeometry args={[0.032, 0.032, 0.003]} />
          <meshBasicMaterial color={i % 2 ? "#4ebcff" : "#65fff0"} transparent opacity={0.82} />
        </mesh>
      ))}
    </group>
  );
}

function FixedPage({ side }: { side: -1 | 1 }) {
  const geometry = useMemo(() => makePageGeometry(side, 0), [side]);
  return (
    <group>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#72ddeb"
          metalness={0.26}
          roughness={0.26}
          clearcoat={1}
          clearcoatRoughness={0.2}
          transmission={0.12}
          thickness={0.08}
          transparent
          opacity={0.54}
          emissive="#06465e"
          emissiveIntensity={0.52}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={geometry} scale={[1, 1, 1.006]}>
        <meshBasicMaterial color="#8ffbff" wireframe transparent opacity={0.13} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <PageDetails side={side} z={0.13} />
    </group>
  );
}

function TurningPage({ index }: { index: number }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => makePageGeometry(1, index * 0.0028), [index]);
  const basePositions = useMemo(() => {
    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    return new Float32Array(attribute.array as Float32Array);
  }, [geometry]);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    if (!group.current || !mesh.current) return;

    const afterOpening = Math.max(0, time - OPEN_DURATION);
    const cycle = afterOpening % LOOP_DURATION;
    const start = index * PAGE_STAGGER;
    const progress = smoothstep((cycle - start) / TURN_DURATION);
    let angle = cycle < start ? 0 : Math.PI * progress;
    let curl = cycle >= start && cycle <= start + TURN_DURATION
      ? Math.sin(clamp01((cycle - start) / TURN_DURATION) * Math.PI)
      : 0;

    const closingStart = TURN_SEQUENCE + 0.25;
    if (cycle > closingStart) {
      const closing = smoothstep((cycle - closingStart) / (RESET_DURATION - 0.25));
      angle = Math.PI * (1 - closing);
      curl = Math.sin(closing * Math.PI) * 0.75;
    }

    group.current.rotation.y = angle;
    group.current.position.z = 0.018 + (PAGE_COUNT - index) * 0.0032;

    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const current = attribute.array as Float32Array;
    for (let i = 0; i < current.length; i += 3) {
      const baseX = basePositions[i];
      const baseY = basePositions[i + 1];
      const baseZ = basePositions[i + 2];
      const u = clamp01(baseX / PAGE_WIDTH);
      const middleBend = Math.sin(u * Math.PI);
      current[i] = baseX - u * u * curl * 0.07;
      current[i + 1] = baseY + Math.cos((baseY / PAGE_HEIGHT) * Math.PI) * middleBend * curl * 0.045;
      current[i + 2] = baseZ + middleBend * curl * 0.28 + u * curl * 0.035;
    }
    attribute.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <group ref={group}>
      <mesh ref={mesh} geometry={geometry}>
        <meshPhysicalMaterial
          color={index % 2 === 0 ? "#91efff" : "#68dce9"}
          metalness={0.2}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.14}
          transmission={0.17}
          thickness={0.12}
          transparent
          opacity={0.56}
          emissive={index % 2 === 0 ? "#087ea7" : "#07546d"}
          emissiveIntensity={0.68}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={geometry} scale={[1, 1, 1.008]}>
        <meshBasicMaterial color="#a9ffff" wireframe transparent opacity={0.16} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <PageDetails side={1} z={0.135 + index * 0.0028} />
      <mesh position={[PAGE_WIDTH * 0.94, 0, 0.12]}>
        <boxGeometry args={[0.014, PAGE_HEIGHT * 0.92, 0.014]} />
        <meshBasicMaterial color={index % 2 === 0 ? "#79f9ef" : "#5bbaff"} transparent opacity={0.78} />
      </mesh>
    </group>
  );
}

function Cover({ side }: { side: -1 | 1 }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    const afterOpening = Math.max(0, time - OPEN_DURATION);
    const cycle = afterOpening % LOOP_DURATION;
    const initialOpen = smoothstep(time / OPEN_DURATION);
    const closingStart = TURN_SEQUENCE + 0.25;
    const cycleOpen = cycle > closingStart
      ? 1 - smoothstep((cycle - closingStart) / (RESET_DURATION - 0.25))
      : 1;
    const open = time < OPEN_DURATION ? initialOpen : cycleOpen;
    if (group.current) {
      group.current.rotation.y = -side * 1.18 * (1 - open);
    }
  });

  return (
    <group ref={group}>
      <mesh position={[side * PAGE_WIDTH * 0.5, 0, side === 1 ? 0.118 : -0.09]}>
        <boxGeometry args={[PAGE_WIDTH + 0.08, PAGE_HEIGHT + 0.12, 0.085]} />
        <meshStandardMaterial
          color="#07121d"
          metalness={0.94}
          roughness={0.21}
          emissive="#052f43"
          emissiveIntensity={0.84}
        />
      </mesh>
      <mesh position={[side * PAGE_WIDTH * 0.5, 0, side === 1 ? 0.164 : -0.044]}>
        <planeGeometry args={[PAGE_WIDTH, PAGE_HEIGHT]} />
        <meshPhysicalMaterial
          color="#071d2d"
          metalness={0.68}
          roughness={0.24}
          clearcoat={1}
          emissive="#063e58"
          emissiveIntensity={0.52}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[side * PAGE_WIDTH * 0.5, 0, side === 1 ? 0.17 : -0.038]}>
        <planeGeometry args={[PAGE_WIDTH * 0.92, PAGE_HEIGHT * 0.92]} />
        <meshBasicMaterial color="#25cbd4" transparent opacity={0.065} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[side * PAGE_WIDTH * 0.5, 0, side === 1 ? 0.18 : -0.03]}>
        <boxGeometry args={[PAGE_WIDTH * 0.72, 0.006, 0.003]} />
        <meshBasicMaterial color="#7dfff4" transparent opacity={0.8} />
      </mesh>
      <mesh position={[side * PAGE_WIDTH * 0.5, -0.12, side === 1 ? 0.18 : -0.03]}>
        <boxGeometry args={[PAGE_WIDTH * 0.48, 0.004, 0.003]} />
        <meshBasicMaterial color="#56aefa" transparent opacity={0.6} />
      </mesh>
      <mesh position={[side * PAGE_WIDTH * 0.5, -0.2, side === 1 ? 0.18 : -0.03]}>
        <boxGeometry args={[PAGE_WIDTH * 0.61, 0.004, 0.003]} />
        <meshBasicMaterial color="#61f8e5" transparent opacity={0.54} />
      </mesh>
      <mesh position={[side * PAGE_WIDTH * 0.5, PAGE_HEIGHT * 0.44, side === 1 ? 0.18 : -0.03]}>
        <sphereGeometry args={[0.035, 14, 14]} />
        <meshStandardMaterial color="#a9fff9" emissive="#4bfff0" emissiveIntensity={3.5} />
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
    const afterOpening = Math.max(0, time - OPEN_DURATION);
    const cycle = afterOpening % LOOP_DURATION;
    const closingStart = TURN_SEQUENCE + 0.25;
    const initialOpen = smoothstep(time / OPEN_DURATION);
    const cycleOpen = cycle > closingStart
      ? 1 - smoothstep((cycle - closingStart) / (RESET_DURATION - 0.25))
      : 1;
    const open = time < OPEN_DURATION ? initialOpen : cycleOpen;

    if (root.current) {
      root.current.position.set(
        compact ? 0 : 0,
        Math.sin(time * 0.68) * 0.095 - 0.03,
        0
      );
      root.current.scale.set(
        (compact ? 1.04 : 1.25) * (0.22 + open * 0.78),
        compact ? 0.88 : 1.02,
        compact ? 0.88 : 1
      );
      root.current.rotation.x = -0.22 + Math.sin(time * 0.38) * 0.035 - pointer.y * 0.035;
      root.current.rotation.y = Math.sin(time * 0.29) * 0.16 + time * 0.028 + pointer.x * 0.11;
      root.current.rotation.z = Math.sin(time * 0.32) * 0.045;
    }
  });

  return (
    <group ref={root}>
      <mesh position={[0, -0.02, -0.15]}>
        <boxGeometry args={[0.16, PAGE_HEIGHT + 0.15, 0.13]} />
        <meshStandardMaterial color="#06121c" metalness={0.95} roughness={0.22} emissive="#0b687a" emissiveIntensity={1.05} />
      </mesh>

      <FixedPage side={-1} />
      {Array.from({ length: PAGE_COUNT }).map((_, index) => (
        <TurningPage key={index} index={index} />
      ))}

      <group position={[0, 0, -0.045]}>
        <mesh position={[-PAGE_WIDTH * 0.5, 0, 0]}>
          <boxGeometry args={[PAGE_WIDTH + 0.035, PAGE_HEIGHT + 0.045, 0.055]} />
          <meshStandardMaterial color="#0a1723" metalness={0.92} roughness={0.24} />
        </mesh>
        <mesh position={[PAGE_WIDTH * 0.5, 0, 0]}>
          <boxGeometry args={[PAGE_WIDTH + 0.035, PAGE_HEIGHT + 0.045, 0.055]} />
          <meshStandardMaterial color="#0a1723" metalness={0.92} roughness={0.24} />
        </mesh>
      </group>

      <Cover side={-1} />
      <Cover side={1} />

      <mesh position={[0, -PAGE_HEIGHT * 0.53, 0.11]}>
        <boxGeometry args={[PAGE_WIDTH * 2.02, 0.018, 0.04]} />
        <meshStandardMaterial color="#42e9e3" emissive="#1ec9dc" emissiveIntensity={2.3} metalness={0.75} roughness={0.22} />
      </mesh>
      <pointLight position={[0, 0.18, 0.5]} color="#43f6e5" intensity={5.2} distance={3.5} />
      <pointLight position={[0.5, 0.18, 0.16]} color="#258bff" intensity={3.2} distance={2.8} />
    </group>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(520 * 3);
    for (let i = 0; i < 520; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 7.6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5.8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3.8;
    }
    const nextGeometry = new THREE.BufferGeometry();
    nextGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return nextGeometry;
  }, []);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.elapsedTime * 0.009;
      points.current.rotation.z = Math.sin(clock.elapsedTime * 0.07) * 0.015;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color="#4dded8"
        size={0.014}
        sizeAttenuation
        transparent
        opacity={0.62}
        depthWrite={false}
      />
    </points>
  );
}

function KnowledgeHologramTrail() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(96 * 3);
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return result;
  }, []);

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.6, 0.2, 0.36),
        new THREE.Vector3(-0.76, 0.52, 0.18),
        new THREE.Vector3(-0.36, 0.86, -0.08),
        new THREE.Vector3(0.28, 1.12, -0.18),
        new THREE.Vector3(0.82, 0.93, -0.3)
      ]),
    []
  );

  useFrame(({ clock }) => {
    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const positions = attribute.array as Float32Array;
    const time = clock.elapsedTime * 0.105;
    const count = positions.length / 3;

    for (let i = 0; i < count; i += 1) {
      const t = (i / count + time) % 1;
      const point = curve.getPoint(t);
      const pulse = Math.sin(t * Math.PI * 10 + clock.elapsedTime * 1.5) * 0.018;
      positions[i * 3] = point.x + pulse;
      positions[i * 3 + 1] = point.y + Math.cos(t * Math.PI * 7 + clock.elapsedTime) * 0.022;
      positions[i * 3 + 2] = point.z + Math.sin(t * Math.PI * 6 + clock.elapsedTime) * 0.024;
    }
    attribute.needsUpdate = true;
  });

  return (
    <>
      <mesh>
        <tubeGeometry args={[curve, 64, 0.0035, 6, false]} />
        <meshBasicMaterial color="#5cf4ed" transparent opacity={0.34} />
      </mesh>
      <points ref={points} geometry={geometry}>
        <pointsMaterial
          color="#b5ffff"
          size={0.022}
          sizeAttenuation
          transparent
          opacity={0.96}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

function HologramFloor() {
  const rings = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (rings.current) {
      rings.current.rotation.z = clock.elapsedTime * 0.035;
      rings.current.rotation.x = -0.08 + Math.sin(clock.elapsedTime * 0.23) * 0.025;
    }
  });

  return (
    <group ref={rings} position={[0, -1.13, -0.26]} scale={[1.22, 0.28, 1]}>
      <mesh>
        <torusGeometry args={[1.24, 0.006, 8, 140]} />
        <meshBasicMaterial color="#5cf2e7" transparent opacity={0.42} />
      </mesh>
      <mesh rotation={[0, 0, 0.8]} scale={[1.27, 1, 1]}>
        <torusGeometry args={[1.24, 0.0035, 8, 140]} />
        <meshBasicMaterial color="#438cff" transparent opacity={0.34} />
      </mesh>
      <mesh scale={[0.78, 0.75, 1]}>
        <torusGeometry args={[1.24, 0.003, 8, 140]} />
        <meshBasicMaterial color="#a1ffff" transparent opacity={0.24} />
      </mesh>
    </group>
  );
}

function SceneContents() {
  return (
    <>
      <ambientLight intensity={0.72} />
      <pointLight position={[2.2, 2.7, 3.8]} color="#64f4e9" intensity={32} distance={8} />
      <pointLight position={[-3, -1.2, 1.4]} color="#3277ff" intensity={18} distance={8} />
      <pointLight position={[0, 2.2, -2]} color="#2b9dff" intensity={11} distance={7} />
      <ParticleField />
      <FloatingKnowledgeBook />
      <KnowledgeHologramTrail />
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
