import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function AlaModel(props) {
    const { nodes, materials } = useGLTF('/models/Ala.glb')
    return (
        <group
            {...props}
            dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Ala.geometry}
                material={nodes.Ala.material}
                rotation={[4.8, 0, 2.2]}
                position={[-15.771, -0.8, 14.6]}
                scale={[1, 1, 0.39]}
            />
        </group>
    )
}

useGLTF.preload('/models/Ala.glb')
