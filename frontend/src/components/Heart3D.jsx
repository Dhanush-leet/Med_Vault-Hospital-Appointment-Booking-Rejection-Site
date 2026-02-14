import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

function Heart() {
    const mesh = useRef(null);
    useFrame((state) => {
        if (mesh.current) {
            mesh.current.scale.setScalar(
                1 + Math.sin(state.clock.elapsedTime * 3) * 0.1
            );
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere args={[1, 64, 64]} ref={mesh}>
                <MeshDistortMaterial
                    color="#ef4444"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.1}
                    emissive="#b91c1c"
                    emissiveIntensity={0.5}
                />
            </Sphere>
        </Float>
    );
}

export default function Heart3D() {
    return (
        <div className="w-full h-64 lg:h-80 relative bg-white/30 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/40 shadow-xl">
            <div className="absolute top-6 left-6 z-10">
                <h3 className="text-2xl font-bold text-slate-800">Cardio Health</h3>
                <p className="text-emerald-600 font-medium">98 BPM • Stable</p>
            </div>
            <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <Heart />
            </Canvas>
        </div>
    );
}
