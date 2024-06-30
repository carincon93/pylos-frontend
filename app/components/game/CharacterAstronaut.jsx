import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function CharacterAstronaut({ animation = 'Idle' }) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/models/CharacterAstronaut.gltf')
    const { actions } = useAnimations(animations, group)

    useEffect(() => {
        actions[animation].reset().fadeIn(0.2).play()
        return () => actions[animation]?.fadeOut(0.2)
    }, [animation])
    return (
        <group
            ref={group}
            dispose={null}>
            <group name="Scene">
                <group
                    name="Armature"
                    rotation={[Math.PI / 2, 0, -1.58]}
                    scale={0.01}>
                    <skinnedMesh
                        name="Body"
                        geometry={nodes.Body.geometry}
                        material={materials['Material.001']}
                        skeleton={nodes.Body.skeleton}
                    />
                    <primitive object={nodes.mixamorigHips} />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/models/CharacterAstronaut.gltf')
