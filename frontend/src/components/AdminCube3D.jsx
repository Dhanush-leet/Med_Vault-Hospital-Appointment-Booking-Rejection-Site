import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Box, Sphere, MeshDistortMaterial } from '@react-three/drei';

function Cube() {
    const mesh = useRef(null);
    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = state.clock.elapsedTime * 0.2;
            mesh.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <Float>
            <Box args={[1.5, 1.5, 1.5]} ref={mesh}>
                <MeshDistortMaterial
                    color="#8b5cf6"
                    attach="material"
                    distort={0.2}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Box>
        </Float>
    );
}

export default function AdminCube3D() {
    return (
        <div className="w-full h-80 relative bg-indigo-950/20 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-indigo-500/30 shadow-2xl">
            <div className="absolute top-6 left-6 z-10">
                <h3 className="text-2xl font-bold text-white">System Core</h3>
                <p className="text-indigo-400 font-medium">100% Uptime • Scalable</p>
            </div>
            <Canvas camera={{ position: [0, 0, 4] }}>
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#ec4899" />
                <ambientLight intensity={0.5} />
                <Cube />
            </Canvas>
        </div>
    );
}
