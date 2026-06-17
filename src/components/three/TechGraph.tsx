"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const NODES = [
  { id: "react", label: "React", pos: [-2, 1.5, 0], color: "#61dafb" },
  { id: "nextjs", label: "Next.js", pos: [0, 2, 0.5], color: "#fff" },
  { id: "typescript", label: "TypeScript", pos: [2, 1.5, 0], color: "#3178c6" },
  { id: "nodejs", label: "Node.js", pos: [-2.5, 0, 0.5], color: "#68a063" },
  { id: "python", label: "Python", pos: [0, 0, 0], color: "#3776ab" },
  { id: "go", label: "Go", pos: [2.5, 0, 0.5], color: "#00add8" },
  { id: "aws", label: "AWS", pos: [-2, -1.5, 0], color: "#ff9900" },
  { id: "kubernetes", label: "K8s", pos: [0, -1.5, 0.5], color: "#326ce5" },
  { id: "openai", label: "OpenAI", pos: [2, -1.5, 0], color: "#10a37f" },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [1, 4], [2, 5],
  [3, 4], [4, 5], [3, 6], [4, 7], [5, 8],
  [6, 7], [7, 8], [0, 4], [2, 4], [1, 7],
];

function TechNode({
  position,
  label,
  color,
}: {
  position: [number, number, number];
  label: string;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.05;
    }
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <Text
        position={[0, -0.3, 0]}
        fontSize={0.12}
        color="#a1a1aa"
        anchorX="center"
        anchorY="top"
      >
        {label}
      </Text>
    </group>
  );
}

function DataPulse({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.elapsedTime * 0.5) % 1;
      ref.current.position.lerpVectors(start, end, t);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#3b82f6" />
    </mesh>
  );
}

function GraphScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.15;
    }
  });

  const nodePositions = useMemo(
    () => NODES.map((n) => new THREE.Vector3(...n.pos)),
    []
  );

  return (
    <group ref={groupRef}>
      {EDGES.map(([a, b], i) => {
        const start = nodePositions[a];
        const end = nodePositions[b];
        const points = [start, end];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineObj = new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({ color: "#3b82f6", transparent: true, opacity: 0.2 })
        );
        return (
          <group key={i}>
            <primitive object={lineObj} />
            <DataPulse start={start} end={end} />
          </group>
        );
      })}
      {NODES.map((node) => (
        <TechNode
          key={node.id}
          position={node.pos as [number, number, number]}
          label={node.label}
          color={node.color}
        />
      ))}
    </group>
  );
}

export function TechGraph({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} />
        <GraphScene />
      </Canvas>
    </div>
  );
}
