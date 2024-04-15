import { useGameStore } from '@/lib/store'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'

export default function Stage(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/models/Stage.glb')

    return (
        <group
            ref={group}
            {...props}
            dispose={null}
            scale={40}>
            <mesh
                name="Plane_1"
                geometry={nodes.Plane_1.geometry}
                material={materials['Grass']}
            />
        </group>
    )
}

useGLTF.preload('/models/Stage.glb')
