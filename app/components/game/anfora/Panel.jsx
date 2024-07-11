import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function PanelModel(props) {
    const { nodes, materials } = useGLTF('/models/Panel.glb')
    return (
        <group
            {...props}
            dispose={null}>
            <group
                rotation={[0.3, 0, 0.1]}
                position={[-20, -22.8, 108]}
                scale={0.02}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['10781_Solar-Panels_V1_1'].geometry}
                    material={materials._10781_Solar_Panels_V101___Default}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['10781_Solar-Panels_V1_2'].geometry}
                    material={materials._10781_Solar_Panels_V102___Default}
                />
            </group>
        </group>
    )
}

useGLTF.preload('/models/Panel.glb')
