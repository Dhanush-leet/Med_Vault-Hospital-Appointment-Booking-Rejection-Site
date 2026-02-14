import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Line({ curve }) {
    const lineRef = useRef()

    useFrame((state) => {
        if (lineRef.current) {
            lineRef.current.position.x = -(state.clock.elapsedTime % 10) * 2 + 10
        }
    })

    return (
        <mesh ref={lineRef}>
            <tubeGeometry args={[curve, 100, 0.05, 8, false]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={2} />
        </mesh>
    )
}

function HeartbeatLine() {
    const curve = useMemo(() => {
        const points = []
        for (let i = 0; i < 100; i++) {
            let x = i * 0.2
            // Heartbeat pulse every 5 units
            if (i % 25 === 0) {
                points.push(new THREE.Vector3(x, 0, 0))
                points.push(new THREE.Vector3(x + 0.1, 1, 0))
                points.push(new THREE.Vector3(x + 0.2, -0.8, 0))
                points.push(new THREE.Vector3(x + 0.3, 0.5, 0))
                x += 0.3
            } else {
                points.push(new THREE.Vector3(x, Math.random() * 0.05, 0))
            }
        }
        return new THREE.CatmullRomCurve3(points)
    }, [])

    return (
        <group>
            <Line curve={curve} />
            <group position={[20, 0, 0]}>
                <Line curve={curve} />
            </group>
        </group>
    )
}

const HeartbeatCanvas = () => {
    return (
        <div className="w-full h-[400px]">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <HeartbeatLine />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default HeartbeatCanvas
