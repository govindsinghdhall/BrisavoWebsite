"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  const points = useMemo(() => {
    const Vancouver = new THREE.Vector3(-0.6, 0.35, 0.7).normalize().multiplyScalar(1.02);
    const Gurugram = new THREE.Vector3(0.75, -0.15, 0.65).normalize().multiplyScalar(1.02);
    return { Vancouver, Gurugram };
  }, []);

  return (
    <group ref={groupRef}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#0a1628"
          emissive="#1e3a5f"
          emissiveIntensity={0.3}
          roughness={0.8}
          metalness={0.2}
          distort={0.15}
          speed={1.5}
          wireframe={false}
        />
      </Sphere>

      <Sphere args={[1.01, 32, 32]}>
        <meshBasicMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.08}
        />
      </Sphere>

      {[points.Vancouver, points.Gurugram].map((pos, i) => (
        <group key={i} position={pos}>
          <mesh>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshBasicMaterial color={i === 0 ? "#ef4444" : "#f59e0b"} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color={i === 0 ? "#ef4444" : "#f59e0b"} transparent opacity={0.3} />
          </mesh>
        </group>
      ))}

      <ConnectionLine start={points.Vancouver} end={points.Gurugram} />
    </group>
  );
}

function ConnectionLine({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) {
  const curve = useMemo(() => {
    const mid = start.clone().add(end).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(1.4);
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(50), [curve]);
  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points]
  );

  const lineObj = useMemo(() => {
    const material = new THREE.LineBasicMaterial({
      color: "#3b82f6",
      transparent: true,
      opacity: 0.5,
    });
    return new THREE.Line(geometry, material);
  }, [geometry]);

  useFrame((state) => {
    const material = lineObj.material as THREE.LineBasicMaterial;
    material.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
  });

  return <primitive object={lineObj} />;
}

function Atmosphere() {
  return (
    <Sphere args={[1.15, 32, 32]}>
      <meshBasicMaterial
        color="#3b82f6"
        transparent
        opacity={0.03}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

export function Globe({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[-10, -5, -5]} intensity={0.4} color="#8b5cf6" />
        <GlobeMesh />
        <Atmosphere />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
