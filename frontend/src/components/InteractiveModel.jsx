import { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function InteractiveModel({ modelPath, scale = 2 }) {
    const [error, setError] = useState(false);
    let scene = null;

    try {
        const gltf = useGLTF(modelPath, true);
        scene = gltf.scene;
    } catch (e) {
        if (!error) setError(true);
    }

    const ref = useRef();
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.005;
        }
    });

    if (error || !scene) {
        return (
            <mesh
                ref={ref}
                scale={clicked ? scale * 1.2 : scale}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setClicked(!clicked)}
            >
                <icosahedronGeometry args={[2, 2]} />
                <meshStandardMaterial
                    color={hovered ? "#10B981" : "#3b82f6"}
                    wireframe
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        );
    }

    return (
        <primitive
            ref={ref}
            object={scene}
            scale={clicked ? scale * 1.2 : scale}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => setClicked(!clicked)}
        />
    );
}

// Preload is handled internally by useGLTF but we can explicitly clear if needed
// useGLTF.clear(modelPath)

