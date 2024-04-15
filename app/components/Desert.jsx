import { useGameStore } from '@/lib/store'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'

export default function Desert(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/models/Desert.glb')

    return (
        <group
            ref={group}
            {...props}
            dispose={null}
            scale={40}
            rotation={[0, 1.2, 0]}>
            <mesh
                name="Plane"
                geometry={nodes.Plane.geometry}
                material={materials['Desert']}
            />
        </group>
    )
}

useGLTF.preload('/models/Desert.glb')
