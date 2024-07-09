import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function MotorModel(props) {
    const { nodes, materials } = useGLTF('/models/Motor.glb')
    return (
        <group
            {...props}
            dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Motor.geometry}
                material={nodes.Motor.material}
                rotation={[1.543, 0, 5]}
                position={[-35, -2, -25]}
                scale={[1, 1.485, 1.005]}
            />
        </group>
    )
}

useGLTF.preload('/models/Motor.glb')
