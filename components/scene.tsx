"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Monolith() {
  const materialRef = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // Calculate scroll progress (0 to 1)
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

    if (materialRef.current) {
      // Modify distortion and speed based on scroll
      materialRef.current.distort = THREE.MathUtils.lerp(0.2, 0.8, progress);
      materialRef.current.speed = THREE.MathUtils.lerp(1, 5, progress);
    }
    
    if (meshRef.current) {
      // Rotate slowly and react to scroll
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1 + progress * Math.PI * 2;
      // Parallax effect
      meshRef.current.position.y = THREE.MathUtils.lerp(0, -2, progress);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#111111" /* Graphite */
          envMapIntensity={1}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
        />
      </Sphere>
    </Float>
  );
}

export function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Monolith />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
