import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { StoneModel } from './Stone'
import { useGameStore } from '@/lib/store'

export function NavegacionModel(props) {
    const { nodes, materials } = useGLTF('/models/Navegacion.glb')
    const showMap = useGameStore((state) => state.showMap)

    return (
        <group
            {...props}
            dispose={null}>
            <group position={[250, -91, -50.4]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sistema_de_navegación_1.geometry}
                    material={nodes.Sistema_de_navegación_1.material}
                    scale={[0.24, 0.038, 0.24]}
                    rotation={[0, 0, -0.2]}
                />
                {showMap && (
                    <StoneModel
                        scale={50}
                        color="purple"
                    />
                )}
            </group>
        </group>
    )
}

useGLTF.preload('/models/Navegacion.glb')
