import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function AnforaModel(props) {
    const { nodes, materials } = useGLTF('/models/Anfora.glb')

    const planetRef = useRef()

    useFrame(() => {
        if (planetRef.current) {
            planetRef.current.rotation.y += 0.001 // Ajusta la velocidad de rotación aquí
        }
    })

    return (
        <group
            {...props}
            dispose={null}
            ref={planetRef}
            position={[7, 0, 0]}
            scale={2}>
            <directionalLight
                intensity={1}
                decay={2}
                color="#f3ede1"
                position={[-0.399, 0.097, -0.563]}
                rotation={[-2.692, -0.601, -1.871]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cloud1.geometry}
                material={nodes.Cloud1.material}
                position={[-0.829, 0.229, 0]}
                scale={[0.069, 0.314, 0.165]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cloud2.geometry}
                material={nodes.Cloud2.material}
                position={[-0.48, 1.067, -0.539]}
                rotation={[-0.095, -0.009, -1.061]}
                scale={[0.069, 0.314, 0.165]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cloud3.geometry}
                material={nodes.Cloud3.material}
                position={[0.683, 0.742, -0.205]}
                rotation={[0.083, -0.025, -2.335]}
                scale={[0.069, 0.314, 0.165]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cloud4.geometry}
                material={nodes.Cloud4.material}
                position={[0.879, -0.392, -0.579]}
                rotation={[-0.342, -0.834, 2.767]}
                scale={[0.069, 0.314, 0.165]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cloud5.geometry}
                material={nodes.Cloud5.material}
                position={[-0.271, 0.229, 0.827]}
                rotation={[0, 1.349, 0]}
                scale={[0.069, 0.314, 0.165]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cloud6.geometry}
                material={nodes.Cloud6.material}
                position={[-0.347, -0.905, 0.454]}
                rotation={[0, 1.349, 0.987]}
                scale={[0.069, 0.314, 0.165]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Anfora.geometry}
                material={nodes.Anfora.material}
                position={[0.191, -0.3, -0.311]}
                rotation={[-2.742, -0.795, 2.627]}
                scale={0.408}
            />
        </group>
    )
}

useGLTF.preload('/models/Anfora.glb')
