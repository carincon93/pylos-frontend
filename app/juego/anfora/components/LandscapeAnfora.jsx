import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export function LandscapeAnforaModel(props) {
    const { nodes, materials } = useGLTF('/models/basic-terrain.glb')
    return (
        <RigidBody
            colliders="trimesh"
            type="fixed">
            <group
                {...props}
                dispose={null}>
                <mesh
                    // castShadow
                    // receiveShadow
                    geometry={nodes.Cube.geometry}
                    material={materials.Material}
                    rotation={[-Math.PI, 0, -Math.PI]}
                    scale={[-19.721, -0.194, -19.721]}
                />
            </group>
        </RigidBody>
    )
}

useGLTF.preload('/models/basic-terrain.glb')
