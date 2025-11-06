"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Float, Text3D, MeshTransmissionMaterial, Sphere } from "@react-three/drei"
import type * as THREE from "three"

interface ProductShowcaseProps {
  productName: string
  features: string[]
}

function AnimatedSphere({ position, color, scrollProgress }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[0.5, 32, 32]} position={position}>
        <MeshTransmissionMaterial
          color={color}
          thickness={0.5}
          roughness={0.1}
          transmission={0.9}
          ior={1.5}
          chromaticAberration={0.5}
          backside
        />
      </Sphere>
    </Float>
  )
}

function ProductText({ text, position, scrollProgress }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(Date.now() * 0.001) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <Text3D
        ref={meshRef}
        font="/fonts/Geist_Bold.json"
        size={0.3}
        height={0.1}
        position={position}
        curveSegments={12}
      >
        {text}
        <meshStandardMaterial color="#0ea5e9" metalness={0.8} roughness={0.2} />
      </Text3D>
    </Float>
  )
}

function Scene({ productName, features, scrollProgress }: any) {
  const { camera } = useThree()

  useFrame(() => {
    // Animate camera based on scroll
    camera.position.z = 5 - scrollProgress * 2
    camera.position.y = scrollProgress * 3
    camera.rotation.x = -scrollProgress * 0.5
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <Environment preset="city" />

      {/* Animated spheres */}
      <AnimatedSphere position={[-2, 0, 0]} color="#0ea5e9" scrollProgress={scrollProgress} />
      <AnimatedSphere position={[2, 1, -1]} color="#06b6d4" scrollProgress={scrollProgress} />
      <AnimatedSphere position={[0, -1, -2]} color="#3b82f6" scrollProgress={scrollProgress} />

      {/* Feature text elements */}
      {features.map((feature, idx) => (
        <ProductText
          key={idx}
          text={feature}
          position={[Math.sin((idx / features.length) * Math.PI * 2) * 3, idx * 1.5 - features.length * 0.5, -2]}
          scrollProgress={scrollProgress}
        />
      ))}

      {/* Central rotating torus */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.3, 16, 100]} />
          <meshStandardMaterial color="#0ea5e9" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>
    </>
  )
}

export function ThreeDProductShowcase({ productName, features }: ProductShowcaseProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const elementTop = rect.top
        const elementHeight = rect.height

        // Calculate scroll progress (0 to 1)
        const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)))
        setScrollProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="absolute inset-0"
        gl={{ alpha: true, antialias: true }}
      >
        <Scene productName={productName} features={features} scrollProgress={scrollProgress} />
      </Canvas>

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-4">
          <h2
            className="text-5xl font-bold text-white drop-shadow-lg"
            style={{
              opacity: 1 - scrollProgress,
              transform: `translateY(${scrollProgress * -100}px)`,
            }}
          >
            {productName}
          </h2>
          <p
            className="text-xl text-white/80 drop-shadow-md"
            style={{
              opacity: 1 - scrollProgress * 2,
              transform: `translateY(${scrollProgress * -50}px)`,
            }}
          >
            Scroll to explore features
          </p>
        </div>
      </div>
    </div>
  )
}
