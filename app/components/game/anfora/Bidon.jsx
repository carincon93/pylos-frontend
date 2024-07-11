import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { StoneModel } from './Stone'
import { useGameStore } from '@/lib/store'

export function BidonModel(props) {
    const { nodes, materials } = useGLTF('/models/Bidon.glb')
    const showMap = useGameStore((state) => state.showMap)

    return (
        <group
            {...props}
            dispose={null}>
            <group
                position={[2, -12.4, 27]}
                scale={[1, 1, 0.28]}
                rotation={[1.7, -0.1, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bidón.geometry}
                    material={nodes.Bidón.material}
                />
                {showMap && (
                    <StoneModel
                        scale={100}
                        rotation={[-1.7, -0.1, 0]}
                    />
                )}
            </group>
        </group>
    )
}

useGLTF.preload('/models/Bidon.glb')
