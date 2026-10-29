"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

function OrbitCore() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    const time = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = time * 0.105 + pointer.x * 0.11;
      group.current.rotation.x = Math.sin(time * 0.17) * 0.055 - pointer.y * 0.07;
    }
    if (core.current) {
      core.current.rotation.y = -time * 0.05;
      core.current.rotation.z = time * 0.025;
    }
    if (shell.current) {
      shell.current.rotation.y = time * 0.075;
      shell.current.rotation.x = -time * 0.018;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.08, 4]} />
        <meshStandardMaterial
          color="#08233a"
          metalness={0.68}
          roughness={0.27}
          emissive="#063d55"
          emissiveIntensity={0.48}
        />
      </mesh>

      <mesh ref={shell} scale={1.014}>
        <icosahedronGeometry args={[1.08, 2]} />
        <meshBasicMaterial color="#66eee1" wireframe transparent opacity={0.36} />
      </mesh>

      <mesh rotation={[Math.PI * 0.43, 0.2, 0.25]}>
        <torusGeometry args={[1.47, 0.009, 8, 180]} />
        <meshBasicMaterial color="#51e6db" transparent opacity={0.78} />
      </mesh>
      <mesh rotation={[Math.PI * 0.63, -0.45, 0.9]}>
        <torusGeometry args={[1.66, 0.006, 8, 180]} />
        <meshBasicMaterial color="#4b8cff" transparent opacity={0.68} />
      </mesh>
      <mesh rotation={[0.9, 0.25, 0.35]}>
        <torusGeometry args={[1.83, 0.004, 8, 180]} />
        <meshBasicMaterial color="#8df8ee" transparent opacity={0.42} />
      </mesh>

      <mesh position={[1.32, 0.48, 0.34]}>
        <sphereGeometry args={[0.075, 20, 20]} />
        <meshStandardMaterial color="#8ffff0" emissive="#43e9d6" emissiveIntensity={2.4} />
      </mesh>
      <mesh position={[-1.48, -0.19, 0.18]}>
        <sphereGeometry args={[0.062, 18, 18]} />
        <meshStandardMaterial color="#7caeff" emissive="#408aff" emissiveIntensity={2.1} />
      </mesh>
      <mesh position={[0.28, -1.56, 0.22]}>
        <sphereGeometry args={[0.055, 18, 18]} />
        <meshStandardMaterial color="#8ffff0" emissive="#43e9d6" emissiveIntensity={2.1} />
      </mesh>
      <mesh position={[-0.22, 1.54, -0.18]}>
        <sphereGeometry args={[0.05, 18, 18]} />
        <meshStandardMaterial color="#a3c7ff" emissive="#408aff" emissiveIntensity={2.1} />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(360 * 3);
    for (let i = 0; i < 360; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 6.8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2.8;
    }
    const nextGeometry = new THREE.BufferGeometry();
    nextGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return nextGeometry;
  }, []);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.elapsedTime * 0.012;
      points.current.rotation.z = Math.sin(clock.elapsedTime * 0.07) * 0.018;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color="#4dded8"
        size={0.016}
        sizeAttenuation
        transparent
        opacity={0.62}
        depthWrite={false}
      />
    </points>
  );
}


function BookPage({ side }: { side: -1 | 1 }) {
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const xSegments = 20;
    const ySegments = 14;

    for (let iy = 0; iy <= ySegments; iy += 1) {
      const v = iy / ySegments;
      const y = (v - 0.5) * 0.78;
      for (let ix = 0; ix <= xSegments; ix += 1) {
        const u = ix / xSegments;
        const x = side * u * 0.62;
        const bow = Math.sin(u * Math.PI) * 0.085;
        const edgeLift = Math.pow(Math.abs(v - 0.5) * 2, 2) * 0.018;
        positions.push(x, y, 0.055 + bow + edgeLift);
        uvs.push(u, v);
      }
    }

    for (let iy = 0; iy < ySegments; iy += 1) {
      for (let ix = 0; ix < xSegments; ix += 1) {
        const a = iy * (xSegments + 1) + ix;
        const b = a + 1;
        const c = a + xSegments + 1;
        const d = c + 1;
        if (side === 1) indices.push(a, b, c, b, d, c);
        else indices.push(a, c, b, b, c, d);
      }
    }

    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    result.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    result.setIndex(indices);
    result.computeVertexNormals();
    return result;
  }, [side]);

  return (
    <group>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#b7e9ed"
          metalness={0.22}
          roughness={0.34}
          clearcoat={0.85}
          clearcoatRoughness={0.22}
          emissive="#0b5968"
          emissiveIntensity={0.19}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[side * 0.32, -0.005, -0.045]}>
        <boxGeometry args={[0.66, 0.83, 0.045]} />
        <meshStandardMaterial
          color="#061521"
          metalness={0.82}
          roughness={0.28}
          emissive="#062a3c"
          emissiveIntensity={0.65}
        />
      </mesh>
      <mesh position={[side * 0.32, -0.414, 0.004]}>
        <boxGeometry args={[0.63, 0.012, 0.038]} />
        <meshStandardMaterial color="#4fdedb" emissive="#14aebd" emissiveIntensity={0.85} metalness={0.65} roughness={0.26} />
      </mesh>
      <mesh position={[side * 0.615, 0, 0.01]}>
        <boxGeometry args={[0.012, 0.81, 0.045]} />
        <meshStandardMaterial color="#7cefe7" emissive="#1a9aa7" emissiveIntensity={0.8} metalness={0.7} roughness={0.24} />
      </mesh>
      {[0.23, 0.135, 0.04, -0.055, -0.15, -0.245].map((y, i) => (
        <mesh key={i} position={[side * (i === 0 ? 0.29 : 0.335), y, 0.166 + Math.sin((i === 0 ? 0.29 : 0.335) / 0.62 * Math.PI) * 0.085]}>
          <boxGeometry args={[i === 1 ? 0.43 : i === 4 ? 0.25 : 0.34, i === 0 ? 0.012 : 0.006, 0.004]} />
          <meshBasicMaterial
            color={i === 0 ? "#e4ffff" : i === 3 ? "#4b9dff" : "#63e9e1"}
            transparent
            opacity={i === 0 ? 0.95 : 0.66}
          />
        </mesh>
      ))}
      <mesh position={[side * 0.43, 0.29, 0.18]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial color="#a8fff6" emissive="#50eee1" emissiveIntensity={3.2} />
      </mesh>
    </group>
  );
}

function OpenKnowledgeBook() {
  const root = useRef<THREE.Group>(null);
  const leftPage = useRef<THREE.Group>(null);
  const rightPage = useRef<THREE.Group>(null);
  const { size } = useThree();

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    const compact = size.width < 560;

    if (root.current) {
      root.current.position.set(compact ? -0.95 : -1.34, compact ? -0.88 : -0.83, compact ? 1.12 : 1.02);
      root.current.scale.setScalar(compact ? 0.47 : 0.59);
      root.current.rotation.x = -0.23 + Math.sin(time * 0.48) * 0.018;
      root.current.rotation.y = Math.sin(time * 0.34) * 0.065;
      root.current.rotation.z = -0.20 + Math.sin(time * 0.29) * 0.018;
    }
    if (leftPage.current) {
      leftPage.current.rotation.y = -0.035 + Math.sin(time * 0.62) * 0.018;
    }
    if (rightPage.current) {
      rightPage.current.rotation.y = 0.035 + Math.sin(time * 0.62 + 0.7) * 0.018;
    }
  });

  return (
    <group ref={root}>
      <mesh position={[0, -0.015, -0.087]}>
        <boxGeometry args={[0.12, 0.83, 0.065]} />
        <meshStandardMaterial color="#07111e" metalness={0.9} roughness={0.24} emissive="#0a6577" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 0.002, -0.035]}>
        <boxGeometry args={[0.035, 0.78, 0.055]} />
        <meshStandardMaterial color="#55e6df" metalness={0.66} roughness={0.26} emissive="#20b9c6" emissiveIntensity={1.1} />
      </mesh>
      <group ref={leftPage}>
        <BookPage side={-1} />
      </group>
      <group ref={rightPage}>
        <BookPage side={1} />
      </group>
      <mesh position={[0, -0.01, -0.052]}>
        <boxGeometry args={[0.11, 0.81, 0.065]} />
        <meshStandardMaterial color="#0a1724" metalness={0.92} roughness={0.22} />
      </mesh>
      <pointLight position={[0, 0.1, 0.31]} color="#3eeadd" intensity={0.8} distance={1.5} />
    </group>
  );
}

function KnowledgeTransferStream() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 84;
    const positions = new Float32Array(count * 3);
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return result;
  }, []);

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.79, -0.69, 1.15),
        new THREE.Vector3(-0.66, -0.55, 1.18),
        new THREE.Vector3(-0.48, -0.41, 1.0),
        new THREE.Vector3(-0.34, -0.25, 0.82)
      ]),
    []
  );

  useFrame(({ clock }) => {
    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const positions = attribute.array as Float32Array;
    const time = clock.elapsedTime * 0.16;
    const count = positions.length / 3;

    for (let i = 0; i < count; i += 1) {
      const t = (i / count + time) % 1;
      const point = curve.getPoint(t);
      const shimmer = Math.sin(t * Math.PI * 8 + clock.elapsedTime * 1.8) * 0.018;
      positions[i * 3] = point.x + shimmer;
      positions[i * 3 + 1] = point.y + Math.cos(t * Math.PI * 6 + clock.elapsedTime) * 0.018;
      positions[i * 3 + 2] = point.z + Math.sin(t * Math.PI * 5 + clock.elapsedTime) * 0.014;
    }
    attribute.needsUpdate = true;
  });

  return (
    <>
      <mesh>
        <tubeGeometry args={[curve, 48, 0.0035, 5, false]} />
        <meshBasicMaterial color="#67f6e7" transparent opacity={0.48} />
      </mesh>
      <points ref={points} geometry={geometry}>
        <pointsMaterial
          color="#a7fff6"
          size={0.024}
          sizeAttenuation
          transparent
          opacity={0.94}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

function SceneContents() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[2.5, 2.8, 3.8]} color="#62f3e4" intensity={24} distance={9} />
      <pointLight position={[-3, -1, 1.4]} color="#3c74ff" intensity={15} distance={8} />
      <pointLight position={[0, 2.2, -2]} color="#3b9bff" intensity={9} distance={7} />
      <ParticleField />
      <OrbitCore />
      <KnowledgeTransferStream />
      <OpenKnowledgeBook />
    </>
  );
}

export default function GrowthScene() {
  return (
    <Canvas
      className="growth-canvas"
      camera={{ position: [0, 0, 5.65], fov: 38 }}
      dpr={[1, 1.5]}
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