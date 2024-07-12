import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { StoneModel } from './Stone'
import { useGameStore } from '@/lib/store'

export function PanelModel(props) {
    const { nodes, materials } = useGLTF('/models/Panel.glb')
    const showMap = useGameStore((state) => state.showMap)

    return (
        <group
            {...props}
            dispose={null}>
            <group
                position={[-15, -52, 190]}
                scale={0.02}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['10781_Solar-Panels_V1_1'].geometry}
                    material={materials._10781_Solar_Panels_V101___Default}
                    rotation={[-0.5, 0, 0.1]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['10781_Solar-Panels_V1_2'].geometry}
                    material={materials._10781_Solar_Panels_V102___Default}
                    rotation={[-0.5, 0, 0.1]}
                />
                {showMap && <StoneModel scale={3000} />}
            </group>
        </group>
    )
}

useGLTF.preload('/models/Panel.glb')
