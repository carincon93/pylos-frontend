import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { MarkerModel } from './Marker'
import { useGameStore } from '@/lib/store'

export function MotorModel(props) {
    const { nodes, materials } = useGLTF('/models/Motor.glb')
    const showMap = useGameStore((state) => state.showMap)

    return (
        <group
            {...props}
            dispose={null}>
            <group
                position={[-205, -55.4, -5]}
                scale={[1, 1.485, 1.005]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Motor.geometry}
                    material={nodes.Motor.material}
                    rotation={[1.543, 0.4, 5]}
                />
                {showMap && <MarkerModel scale={50} />}
            </group>
        </group>
    )
}

useGLTF.preload('/models/Motor.glb')
