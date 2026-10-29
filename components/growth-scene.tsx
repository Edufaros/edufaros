"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const BOOK_WIDTH = 1.48;
const BOOK_HEIGHT = 1.24;
const PAGE_COUNT = 8;
const INTRO_OPEN_SECONDS = 0; // The book stays open; only pages animate.
const TURN_SECONDS = 0.9;
const TURN_STAGGER_SECONDS = 0.94;
const FORWARD_SECONDS = (PAGE_COUNT - 1) * TURN_STAGGER_SECONDS + TURN_SECONDS;
const RETURN_SECONDS = 2.35;
const CYCLE_SECONDS = FORWARD_SECONDS + RETURN_SECONDS;
const GRID_COLUMNS = 28;
const GRID_ROWS = 20;
const PAPER_COLOR = "#fff6df";
const GOLD_COLOR = "#d3b77b";

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function easeInOut(value: number) {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

function makePaperTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create paper texture canvas.");

  const gradient = ctx.createLinearGradient(0, 0, 512, 512);
  gradient.addColorStop(0, "#fff9e9");
  gradient.addColorStop(0.48, "#f3e8ce");
  gradient.addColorStop(1, "#e8d9b8");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Fine paper fibres and subdued, unreadable book-print detail.
  for (let i = 0; i < 1150; i += 1) {
    const x = (i * 73.73) % 512;
    const y = (i * 137.91 + (i % 17) * 3.3) % 512;
    const alpha = 0.025 + ((i * 13) % 7) * 0.006;
    ctx.fillStyle = "rgba(112, 87, 51, " + alpha + ")";
    ctx.fillRect(x, y, 1 + (i % 3), 1);
  }

  ctx.fillStyle = "rgba(122, 91, 46, 0.25)";
  ctx.fillRect(30, 42, 112, 2);
  ctx.fillStyle = "rgba(135, 100, 46, 0.48)";
  ctx.fillRect(30, 53, 72, 3);

  for (let row = 0; row < 27; row += 1) {
    const y = 82 + row * 14.2;
    const width = 222 + ((row * 37) % 82);
    ctx.fillStyle = row % 5 === 0 ? "rgba(110, 99, 76, 0.18)" : "rgba(95, 89, 76, 0.28)";
    ctx.fillRect(30, y, Math.min(width, 294), row % 6 === 0 ? 2.4 : 1.4);
    if (row % 3 !== 0) {
      ctx.fillRect(30, y + 4, Math.max(84, width - ((row * 19) % 65)), 1);
    }
  }

  ctx.strokeStyle = "rgba(185, 145, 76, 0.38)";
  ctx.lineWidth = 1;
  ctx.strokeRect(18, 18, 476, 476);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function makeGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create glow texture canvas.");

  const gradient = ctx.createRadialGradient(256, 256, 2, 256, 256, 254);
  gradient.addColorStop(0, "rgba(255, 255, 246, 0.98)");
  gradient.addColorStop(0.12, "rgba(255, 250, 229, 0.62)");
  gradient.addColorStop(0.28, "rgba(255, 226, 165, 0.24)");
  gradient.addColorStop(0.54, "rgba(255, 248, 222, 0.065)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function pagePoint(side: -1 | 1, u: number, v: number, zOffset = 0, fanLift = 0.32) {
  // The front edge remains low and broad; each page rises from the spine to form a fan.
  const x = side * u * BOOK_WIDTH;
  const frontToBack = -0.35 + v * 0.31;
  const spineRise = fanLift * Math.pow(1 - u, 1.28) * Math.pow(v, 1.52);
  const paperCurl = Math.sin(u * Math.PI) * Math.sin(v * Math.PI) * (0.032 + v * 0.024);
  const z = 0.025 + u * 0.038 + Math.sin(u * Math.PI) * 0.052 + zOffset;
  const y = frontToBack + spineRise + paperCurl;
  return new THREE.Vector3(x, y, z);
}

function makePageGeometry(side: -1 | 1, zOffset = 0, fanLift = 0.32) {
  const vertexCount = (GRID_COLUMNS + 1) * (GRID_ROWS + 1);
  const positions = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  const indices: number[] = [];
  let p = 0;
  let uv = 0;

  for (let iy = 0; iy <= GRID_ROWS; iy += 1) {
    const v = iy / GRID_ROWS;
    for (let ix = 0; ix <= GRID_COLUMNS; ix += 1) {
      const u = ix / GRID_COLUMNS;
      const point = pagePoint(side, u, v, zOffset, fanLift);
      positions[p++] = point.x;
      positions[p++] = point.y;
      positions[p++] = point.z;
      uvs[uv++] = u;
      uvs[uv++] = v;
    }
  }

  for (let iy = 0; iy < GRID_ROWS; iy += 1) {
    for (let ix = 0; ix < GRID_COLUMNS; ix += 1) {
      const a = iy * (GRID_COLUMNS + 1) + ix;
      const b = a + 1;
      const c = a + GRID_COLUMNS + 1;
      const d = c + 1;
      if (side === 1) indices.push(a, b, c, b, d, c);
      else indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function makeEdgeCurve(
  side: -1 | 1,
  edge: "outer" | "top" | "bottom",
  fanLift = 0.32,
  zOffset = 0.045
) {
  const coords: Array<[number, number]> = edge === "outer"
    ? [[1, 0], [1, 0.24], [1, 0.58], [1, 1]]
    : edge === "top"
      ? [[0, 1], [0.32, 1], [0.68, 1], [1, 1]]
      : [[0, 0], [0.32, 0], [0.68, 0], [1, 0]];
  const points = coords.map(([u, v]) => pagePoint(side, u, v, zOffset, fanLift));
  return new THREE.CatmullRomCurve3(points);
}

function PaperSurface({
  geometry,
  texture,
  opacity = 1
}: {
  geometry: THREE.BufferGeometry;
  texture: THREE.Texture;
  opacity?: number;
}) {
  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        map={texture}
        color={PAPER_COLOR}
        metalness={0.015}
        roughness={0.79}
        clearcoat={0.08}
        clearcoatRoughness={0.76}
        transparent={opacity < 1}
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function RestingPage({
  side,
  layer,
  fanLift,
  texture
}: {
  side: -1 | 1;
  layer: number;
  fanLift: number;
  texture: THREE.Texture;
}) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => makePageGeometry(side, -layer * 0.008, fanLift), [side, layer, fanLift]);
  const edge = useMemo(() => makeEdgeCurve(side, "outer", fanLift, 0.04 - layer * 0.008), [side, fanLift, layer]);

  useFrame(() => {
    if (group.current) {
      // Outer/lower sheets sit in front; taller sheets recede slightly to form a visible fan.
      group.current.rotation.z = -side * (0.009 + layer * 0.005);
      group.current.position.z = -layer * 0.006;
    }
  });

  return (
    <group ref={group}>
      <PaperSurface geometry={geometry} texture={texture} />
      <mesh>
        <tubeGeometry args={[edge, 30, 0.0055, 5, false]} />
        <meshStandardMaterial
          color={layer % 2 === 0 ? "#ecd8a8" : "#c5a96d"}
          metalness={0.24}
          roughness={0.52}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

function TurningPage({ index, texture }: { index: number; texture: THREE.Texture }) {
  const group = useRef<THREE.Group>(null);
  const fanLift = 0.2 + index * 0.09;
  const geometry = useMemo(() => makePageGeometry(1, 0.012 + index * 0.005, fanLift), [index, fanLift]);
  const originalPositions = useMemo(() => {
    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    return new Float32Array(attr.array as Float32Array);
  }, [geometry]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const elapsed = clock.elapsedTime;
    const cycle = elapsed % CYCLE_SECONDS;
    let angle = 0;
    let curl = 0;

    if (cycle < FORWARD_SECONDS) {
      const raw = (cycle - index * TURN_STAGGER_SECONDS) / TURN_SECONDS;
      angle = Math.PI * easeInOut(raw);
      if (raw >= 0 && raw <= 1) curl = Math.sin(raw * Math.PI);
    } else {
      const reset = cycle - FORWARD_SECONDS;
      const raw = (reset - (PAGE_COUNT - 1 - index) * 0.2) / 0.66;
      angle = Math.PI * (1 - easeInOut(raw));
      if (raw >= 0 && raw <= 1) curl = Math.sin(raw * Math.PI) * 0.72;
    }

    group.current.rotation.y = angle;
    group.current.position.z = 0.015 + index * 0.004;

    const position = geometry.getAttribute("position") as THREE.BufferAttribute;
    const current = position.array as Float32Array;
    for (let i = 0; i < current.length; i += 3) {
      const u = clamp01(originalPositions[i] / BOOK_WIDTH);
      const pageMiddle = Math.sin(u * Math.PI);
      current[i] = originalPositions[i] - u * u * curl * 0.045;
      current[i + 1] = originalPositions[i + 1] + pageMiddle * curl * 0.07;
      current[i + 2] = originalPositions[i + 2] + pageMiddle * curl * 0.23 + u * curl * 0.025;
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <group ref={group}>
      <PaperSurface geometry={geometry} texture={texture} />
      <mesh>
        <tubeGeometry args={[makeEdgeCurve(1, "outer", 1.12 + (index % 2) * 0.08, 0.1 + index * 0.004), 30, 0.0045, 5, false]} />
        <meshBasicMaterial color={GOLD_COLOR} transparent opacity={0.62} />
      </mesh>
    </group>
  );
}

function BookCover({ side }: { side: -1 | 1 }) {
  const geometry = useMemo(() => makePageGeometry(side, -0.1, 0.09), [side]);
  const edge = useMemo(() => makeEdgeCurve(side, "outer", 0.09, -0.02), [side]);

  return (
    <group>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#35101f"
          metalness={0.24}
          roughness={0.42}
          clearcoat={0.42}
          clearcoatRoughness={0.32}
          emissive="#15050c"
          emissiveIntensity={0.24}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[edge, 38, 0.006, 5, false]} />
        <meshStandardMaterial color={GOLD_COLOR} metalness={0.65} roughness={0.32} emissive="#5c3f1d" emissiveIntensity={0.28} />
      </mesh>
    </group>
  );
}

function PageBlock() {
  const curves = useMemo(() => {
    return Array.from({ length: 15 }, (_, index) => {
      const inset = index * 0.008;
      const frontY = -0.04 - inset * 0.34;
      const frontZ = 0.12 - index * 0.0048;
      return new THREE.CatmullRomCurve3([
        new THREE.Vector3(-BOOK_WIDTH + inset, frontY + 0.025, frontZ),
        new THREE.Vector3(-0.94, frontY + 0.005, frontZ + 0.055),
        new THREE.Vector3(0, frontY - 0.018, frontZ + 0.085),
        new THREE.Vector3(0.94, frontY + 0.005, frontZ + 0.055),
        new THREE.Vector3(BOOK_WIDTH - inset, frontY + 0.025, frontZ)
      ]);
    });
  }, []);

  return (
    <group>
      {curves.map((curve, index) => (
        <mesh key={index}>
          <tubeGeometry args={[curve, 48, 0.0055, 5, false]} />
          <meshStandardMaterial
            color={index % 3 === 0 ? "#f6e7c5" : index % 3 === 1 ? "#d1b77d" : "#a79062"}
            metalness={0.12}
            roughness={0.74}
            transparent
            opacity={0.76 - index * 0.022}
          />
        </mesh>
      ))}
      <mesh position={[0, -0.058, 0.19]}>
        <boxGeometry args={[0.14, 0.046, 0.16]} />
        <meshPhysicalMaterial color="#40111f" metalness={0.22} roughness={0.5} clearcoat={0.26} />
      </mesh>
      <mesh position={[0, -0.03, 0.265]}>
        <boxGeometry args={[0.018, 0.058, 0.014]} />
        <meshStandardMaterial color="#d7b975" metalness={0.8} roughness={0.28} emissive="#66451e" emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

function BookGlow({ texture }: { texture: THREE.Texture }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const material = ref.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.085 + (Math.sin(clock.elapsedTime * 1.15) + 1) * 0.025;
      ref.current.scale.y = 1 + Math.sin(clock.elapsedTime * 0.8) * 0.035;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0.04, -0.48]}>
      <planeGeometry args={[3.6, 3.55]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.62}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function makeFourPointStar() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 1);
  shape.lineTo(0.075, 0.12);
  shape.lineTo(0.5, 0);
  shape.lineTo(0.075, -0.12);
  shape.lineTo(0, -1);
  shape.lineTo(-0.075, -0.12);
  shape.lineTo(-0.5, 0);
  shape.lineTo(-0.075, 0.12);
  shape.closePath();
  return new THREE.ShapeGeometry(shape, 1);
}

function StarTrail() {
  const stars = useRef<THREE.InstancedMesh>(null);
  const count = 38;
  const geometry = useMemo(() => makeFourPointStar(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tintWhite = useMemo(() => new THREE.Color("#fffdf4"), []);
  const tintGold = useMemo(() => new THREE.Color("#f8e7c3"), []);

  useFrame(({ clock }) => {
    if (!stars.current) return;
    const time = clock.elapsedTime;
    for (let i = 0; i < count; i += 1) {
      const progress = (i / count + time * 0.052) % 1;
      const sBend = Math.sin(progress * Math.PI * 2.1);
      const subtleWave = Math.sin(progress * 12 + i * 0.9) * 0.042;
      dummy.position.set(
        sBend * 0.36 + subtleWave,
        -0.30 + progress * 2.8,
        0.23 + Math.sin(progress * 5.3 + time) * 0.035
      );
      const twinkle = 0.66 + (Math.sin(time * 2.6 + i * 1.7) + 1) * 0.17;
      const size = (i % 11 === 0 ? 0.12 : i % 5 === 0 ? 0.067 : 0.026 + (i % 3) * 0.006) * twinkle;
      dummy.scale.set(size, size * (i % 4 === 0 ? 1.5 : 1), size);
      dummy.rotation.set(0, 0, Math.sin(time * 0.38 + i) * 0.2);
      dummy.updateMatrix();
      stars.current.setMatrixAt(i, dummy.matrix);
      stars.current.setColorAt(i, i % 4 === 0 ? tintGold : tintWhite);
    }
    stars.current.instanceMatrix.needsUpdate = true;
    if (stars.current.instanceColor) stars.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={stars} args={[geometry, undefined, count]}>
      <meshBasicMaterial
        color="#fffdf4"
        transparent
        opacity={0.94}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

function AmbientParticles() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(310 * 3);
    for (let i = 0; i < 310; i += 1) {
      positions[i * 3] = Math.sin(i * 12.9898) * 3.8;
      positions[i * 3 + 1] = Math.cos(i * 7.233) * 2.6;
      positions[i * 3 + 2] = Math.sin(i * 4.723) * 1.8 - 0.55;
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return result;
  }, []);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.elapsedTime * 0.006;
      points.current.rotation.z = Math.sin(clock.elapsedTime * 0.06) * 0.008;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color="#c2e5ea"
        size={0.011}
        sizeAttenuation
        transparent
        opacity={0.39}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingKnowledgeBook({
  paperTexture,
  glowTexture
}: {
  paperTexture: THREE.Texture;
  glowTexture: THREE.Texture;
}) {
  const { size } = useThree();
  const compact = size.width < 560;

  const leftFan = [0.08, 0.16, 0.25, 0.35, 0.46, 0.58, 0.7, 0.82, 0.94, 1.02];
  const rightFan = [0.07, 0.15, 0.23, 0.33, 0.44, 0.55, 0.67, 0.78, 0.89, 0.98];

  return (
    <group>
      <BookGlow texture={glowTexture} />
      <group
        position={[0, -0.63, 0]}
        scale={[compact ? 0.84 : 1.22, compact ? 0.84 : 0.98, compact ? 0.86 : 1]}
        rotation={[-0.17, 0, -0.015]}
      >
        <BookCover side={-1} />
        <BookCover side={1} />

        {leftFan.map((fanLift, layer) => (
          <RestingPage
            key={"left-" + layer}
            side={-1}
            layer={layer}
            fanLift={fanLift}
            texture={paperTexture}
          />
        ))}
        {rightFan.map((fanLift, layer) => (
          <RestingPage
            key={"right-" + layer}
            side={1}
            layer={layer}
            fanLift={fanLift}
            texture={paperTexture}
          />
        ))}
        {Array.from({ length: PAGE_COUNT }).map((_, index) => (
          <TurningPage key={index} index={index} texture={paperTexture} />
        ))}
        <PageBlock />
      </group>

      <pointLight position={[0, -0.48, 0.36]} color="#fff2cf" intensity={1.45} distance={2.8} />
      <pointLight position={[-1.05, -0.05, 0.13]} color="#8adfff" intensity={0.85} distance={2.7} />
      <pointLight position={[1.0, 0.15, 0.14]} color="#72eaff" intensity={0.7} distance={2.5} />
    </group>
  );
}

function SparkleAtmosphere() {
  const paperTexture = useMemo(() => makePaperTexture(), []);
  const glowTexture = useMemo(() => makeGlowTexture(), []);

  return (
    <>
      <mesh position={[0, 0.4, -0.9]}>
        <planeGeometry args={[4.0, 4.0]} />
        <meshBasicMaterial
          map={glowTexture}
          transparent
          opacity={0.27}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <AmbientParticles />
      <FloatingKnowledgeBook paperTexture={paperTexture} glowTexture={glowTexture} />
      <StarTrail />
    </>
  );
}

export default function GrowthScene() {
  return (
    <Canvas
      className="growth-canvas"
      camera={{ position: [0, 0, 5.65], fov: 38 }}
      dpr={[1, 1.3]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#000000", 0);
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
      }}
    >
      <ambientLight intensity={0.78} />
      <pointLight position={[-2.2, 2.6, 3.8]} color="#fff3d2" intensity={9} distance={8} />
      <pointLight position={[2.7, 1.4, 2.6]} color="#4ddff6" intensity={4.5} distance={7} />
      <pointLight position={[-2.5, -1.2, 1.8]} color="#459cff" intensity={2.8} distance={7} />
      <SparkleAtmosphere />
    </Canvas>
  );
}
