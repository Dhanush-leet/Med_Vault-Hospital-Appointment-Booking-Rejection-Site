import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';

function Particles(props) {
    const ref = useRef();

    // Create random points on a sphere
    const [positions, setPositions] = useMemo(() => {
        const coords = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const r = 1.5 + Math.random() * 0.5;

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            coords[i * 3] = x;
            coords[i * 3 + 1] = y;
            coords[i * 3 + 2] = z;
        }
        return [coords];
    }, []);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.elapsedTime * 0.1;
            ref.current.rotation.y = state.clock.elapsedTime * 0.15;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
            <PointMaterial
                transparent
                color="#3b82f6"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </Points>
    );
}

export default function Brain3D() {
    return (
        <div className="w-full h-80 relative bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-700 shadow-2xl">
            <div className="absolute top-6 left-6 z-10">
                <h3 className="text-2xl font-bold text-white">Neural Analytics</h3>
                <p className="text-blue-400 font-medium">Real-time Logic Processing</p>
            </div>
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <fog attach="fog" args={['#0f172a', 5, 15]} />
                <ambientLight intensity={0.5} />
                <Particles />
            </Canvas>
        </div>
    );
}
