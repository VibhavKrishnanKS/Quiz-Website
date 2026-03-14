import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei'

// Custom hook to manage particle positions and animation states
const ParticleSystem = ({ introStep, mouse }) => {
  const pointsRef = useRef()
  const { viewport } = useThree()
  
  // Reduce particle count on mobile for better performance
  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 2000 : 4000
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [count])

  // Simple "Hey" target positions
  const heyPositions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        const char = i % 3; // 0=H, 1=E, 2=Y
        let tx = 0, ty = 0;
        
        if (char === 0) { // H
            tx = -3 + (Math.random() * 0.5);
            ty = (Math.random() - 0.5) * 2;
            if (Math.random() > 0.3) tx = -3 + (i % 2 === 0 ? -0.2 : 0.2);
            else { tx = -3 + (Math.random() - 0.5) * 0.4; ty = (Math.random() - 0.5) * 0.2; }
        } else if (char === 1) { // E
            tx = 0 + (Math.random() * 0.5);
            ty = (Math.random() - 0.5) * 2;
            if (Math.random() > 0.5) { ty = (i % 3 - 1) * 0.8; tx = 0 + Math.random() * 0.8; }
        } else { // Y
            tx = 3 + (Math.random() * 0.5);
            ty = (Math.random() - 0.5) * 2;
            if (ty > 0) tx = 3 + (Math.random() - 0.5) * ty * 2;
            else tx = 3;
        }

        pos[i * 3] = tx;
        pos[i * 3 + 1] = ty;
        pos[i * 3 + 2] = Math.sin(i) * 0.5;
    }
    return pos
  }, [count])

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const points = pointsRef.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        
        if (introStep === 1) {
            // Morph to "Hey"
            points[i3] += (heyPositions[i3] - points[i3]) * 0.1
            points[i3+1] += (heyPositions[i3+1] - points[i3+1]) * 0.1
            points[i3+2] += (heyPositions[i3+2] - points[i3+2]) * 0.1
        } else if (introStep === 5) {
            // Time warp spiral inward
            const radius = Math.sqrt(points[i3]**2 + points[i3+1]**2)
            const angle = Math.atan2(points[i3+1], points[i3]) + delta * 8 / (radius + 0.5)
            const newRadius = radius * 0.98 - delta * 2
            
            if (newRadius < 0.2) {
                const r = 15 + Math.random() * 5
                const a = Math.random() * Math.PI * 2
                points[i3] = Math.cos(a) * r
                points[i3+1] = Math.sin(a) * r
                points[i3+2] = (Math.random() - 0.5) * 10
            } else {
                points[i3] = Math.cos(angle) * newRadius
                points[i3+1] = Math.sin(angle) * newRadius
                points[i3+2] += delta * 15 // Zoom outward visual
            }
        } else {
            // Low-gravity drift + mouse
            const driftX = Math.sin(time * 0.1 + i) * 0.005
            const driftY = Math.cos(time * 0.15 + i) * 0.005
            points[i3] += driftX + (mouse.current[0] * 0.2 - points[i3]) * 0.002
            points[i3 + 1] += driftY + (mouse.current[1] * -0.2 - points[i3 + 1]) * 0.002
            points[i3 + 2] += Math.sin(time * 0.3 + i) * 0.005
        }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y += delta * 0.1
  })

  return (
    <>
    <Points ref={pointsRef}>
      <PointMaterial
        transparent
        vertexColors
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={new Float32Array(count * 3).map((_, i) => {
              const colors = [
                  [0.26, 0.52, 0.96], [0.92, 0.26, 0.21], [0.98, 0.74, 0.02], 
                  [0.2, 0.66, 0.33], [0.64, 0.35, 1.0], [1.0, 0.3, 0.55], [0, 0.9, 1.0]
              ];
              return colors[i % colors.length][i % 3];
          })}
          itemSize={3}
        />
      </bufferGeometry>
    </Points>

    {/* Floating Hearts in specific steps */}
    {introStep >= 1 && introStep <= 3 && (
        <group>
            {Array.from({ length: 30 }).map((_, i) => (
                <Float key={i} speed={3} rotationIntensity={1} floatIntensity={1} position={[(Math.random()-0.5)*10, (Math.random()-0.5)*10, (Math.random()-0.5)*5]}>
                    <Sphere args={[0.03, 16, 16]}>
                        <meshBasicMaterial color={i % 2 === 0 ? "#FF4D8D" : "#A259FF"} transparent opacity={0.4} />
                    </Sphere>
                </Float>
            ))}
        </group>
    )}
    </>
  )
}


const Background = ({ introStep }) => {
  const mouse = useRef([0, 0])
  
  const handleMouseMove = (e) => {
    mouse.current = [
      (e.clientX / window.innerWidth) * 2 - 1,
      (e.clientY / window.innerHeight) * 2 - 1
    ]
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 bg-[#000000] -z-10">
        {/* Glow Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#4285F4] rounded-full blur-[150px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF4D8D] rounded-full blur-[150px] opacity-20 animate-pulse-slow"></div>
        
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4285F4" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#FF4D8D" />
        
        <ParticleSystem introStep={introStep} mouse={mouse} />
        
        {/* Floating Shapes */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere args={[0.1, 32, 32]} position={[2, 2, -2]}>
                <MeshDistortMaterial color="#FBBC05" speed={5} distort={0.4} />
            </Sphere>
        </Float>
        <Float speed={3} rotationIntensity={0.8} floatIntensity={0.6}>
            <Sphere args={[0.08, 32, 32]} position={[-3, 1, -1]}>
                <MeshDistortMaterial color="#00E5FF" speed={4} distort={0.5} />
            </Sphere>
        </Float>
      </Canvas>
    </div>
  )
}

export default Background
