"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
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

function SceneContents() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[2.5, 2.8, 3.8]} color="#62f3e4" intensity={24} distance={9} />
      <pointLight position={[-3, -1, 1.4]} color="#3c74ff" intensity={15} distance={8} />
      <pointLight position={[0, 2.2, -2]} color="#3b9bff" intensity={9} distance={7} />
      <ParticleField />
      <OrbitCore />
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