"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import type * as THREE from "three"

function FloatingParticles({ scrollY }: { scrollY: number }) {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 100

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      // Blue to cyan gradient colors
      colors[i * 3] = 0.2 + Math.random() * 0.3 // R
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.5 // G
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2 // B
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (!particlesRef.current) return

    const time = state.clock.getElapsedTime()
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      // Animate particles with scroll and time
      positions[i3 + 1] += Math.sin(time + i) * 0.001
      positions[i3] += Math.cos(time + i * 0.5) * 0.001

      // Apply scroll effect
      positions[i3 + 2] = (positions[i3 + 2] + scrollY * 0.001) % 10
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
    particlesRef.current.rotation.y = time * 0.05
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={particles.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function AnimatedSphere({ scrollY }: { scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()

    meshRef.current.rotation.x = time * 0.2 + scrollY * 0.0005
    meshRef.current.rotation.y = time * 0.3 + scrollY * 0.0003
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.5
  })

  return (
    <mesh ref={meshRef} position={[3, 0, -5]}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial color="#3b82f6" wireframe opacity={0.3} transparent />
    </mesh>
  )
}

function AnimatedTorus({ scrollY }: { scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()

    meshRef.current.rotation.x = time * 0.3 - scrollY * 0.0003
    meshRef.current.rotation.z = time * 0.2
    meshRef.current.position.x = Math.cos(time * 0.4) * 2
  })

  return (
    <mesh ref={meshRef} position={[-3, 1, -6]}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial color="#06b6d4" wireframe opacity={0.2} transparent />
    </mesh>
  )
}

export function ThreeDBackground() {
  const scrollY = useRef(0)

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      scrollY.current = window.scrollY
    })
  }

  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <FloatingParticles scrollY={scrollY.current} />
        <AnimatedSphere scrollY={scrollY.current} />
        <AnimatedTorus scrollY={scrollY.current} />
      </Canvas>
    </div>
  )
}
