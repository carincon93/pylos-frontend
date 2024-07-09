import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function PanelModel(props) {
    const { nodes, materials } = useGLTF('/models/Panel.glb')
    return (
        <group
            {...props}
            dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Panel_solar.geometry}
                material={nodes.Panel_solar.material}
                rotation={[0.718, 0, 0]}
                position={[30, -2, -18]}
                scale={[1.515, 0.197, 1]}
            />
        </group>
    )
}

useGLTF.preload('/models/Panel.glb')
