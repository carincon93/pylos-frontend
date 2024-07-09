import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function NavegacionModel(props) {
    const { nodes, materials } = useGLTF('/models/Navegacion.glb')
    return (
        <group
            {...props}
            dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sistema_de_navegación_1.geometry}
                material={nodes.Sistema_de_navegación_1.material}
                position={[40.187, -2.4, 50.4]}
                scale={[0.24, 0.038, 0.24]}
            />
        </group>
    )
}

useGLTF.preload('/models/Navegacion.glb')
