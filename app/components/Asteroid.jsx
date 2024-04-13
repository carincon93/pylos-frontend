import { useGameStore } from '@/lib/store'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'

export default function Asteroid(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/models/Asteroid.glb')

    return (
        <group
            ref={group}
            {...props}
            dispose={null}>
            <mesh
                name="Sphere"
                geometry={nodes.Sphere.geometry}
                material={materials['']}
            />
        </group>
    )
}

useGLTF.preload('/models/Asteroid.glb')
