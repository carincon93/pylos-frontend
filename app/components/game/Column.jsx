import { useGameStore } from '@/lib/store'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'

export default function Column(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/models/Column.glb')

    return (
        <group
            ref={group}
            {...props}
            dispose={null}
            scale={35}
            rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
                name="Column2_1"
                geometry={nodes.Column2_1.geometry}
                material={materials['DarkGrey_Floor']}
            />
        </group>
    )
}

useGLTF.preload('/models/Column.glb')
