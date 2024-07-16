import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useGameStore } from '@/lib/store'
import { MarkerModel } from './Marker'

export function ReactorModel(props) {
    const { nodes, materials } = useGLTF('/models/Reactor.glb')

    const showMap = useGameStore((state) => state.showMap)

    return (
        <group
            {...props}
            dispose={null}>
            <group position={[-100, -70.5, -250]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Reactor.geometry}
                    material={nodes.Reactor.material}
                    rotation={[1.2, -0.024, 0.004]}
                    scale={[1.405, 4.089, 1.405]}
                />
                {showMap && <MarkerModel scale={80} />}
            </group>
        </group>
    )
}

useGLTF.preload('/models/Reactor.glb')
