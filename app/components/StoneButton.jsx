import { useGameStore } from '@/lib/store'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'

export default function StoneButton(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/models/StonePlatform.glb')

    return (
        <group
            ref={group}
            {...props}
            dispose={null}>
            <mesh
                name="StonePlatform_Cylinder"
                geometry={nodes.StonePlatform_Cylinder.geometry}
                material={materials['Material.001']}>
                {props.selected && <meshStandardMaterial color="black" />}
            </mesh>
        </group>
    )
}

useGLTF.preload('/models/StonePlatform.glb')
