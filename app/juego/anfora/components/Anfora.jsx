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
            {/* <directionalLight
                intensity={1}
                decay={2}
                color="#f3ede1"
                position={[-0.399, 0.097, -0.563]}
                rotation={[-2.692, -0.601, -1.871]}
            /> */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere.geometry}
                material={nodes.Sphere.material}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh_7.geometry}
                material={nodes.Mesh_7.material}
                position={[0.365, 0.23, -0.025]}
                rotation={[-2.06, -0.432, 1.468]}
                scale={[0.301, 0.028, 0.212]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere_1.geometry}
                material={nodes.Sphere_1.material}
                position={[0, 0.714, 0]}
                scale={[0.384, 0.092, 0.137]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere_1.geometry}
                material={nodes.Sphere_1.material}
                position={[-0.618, 0.323, 0.104]}
                rotation={[-0.397, -0.231, 0.803]}
                scale={[0.306, 0.092, 0.11]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere_3.geometry}
                material={nodes.Sphere_3.material}
                position={[-0.588, -0.576, 0.488]}
                rotation={[-0.397, -0.231, 2.438]}
                scale={[0.306, 0.092, 0.11]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere_2.geometry}
                material={nodes.Sphere_2.material}
                position={[0.739, 0.29, 0]}
                rotation={[0, 0, -1.238]}
                scale={[0.306, 0.092, 0.11]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere_4.geometry}
                material={nodes.Sphere_4.material}
                position={[0.521, -0.495, 0]}
                rotation={[0, 0, -2.485]}
                scale={[0.306, 0.092, 0.11]}
            />
        </group>
    )
}

useGLTF.preload('/models/Anfora.glb')
