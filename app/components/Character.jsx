import { useGameStore } from '@/lib/store'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'

export default function Character(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/models/AstronautModel.glb')

    const { actions } = useAnimations(animations, group)

    const characterState = useGameStore((state) => state.characterState)

    useEffect(() => {
        actions[characterState].reset().play()
        return () => {
            actions[characterState].fadeOut(0.2)
        }
    }, [characterState])

    return (
        <group
            ref={group}
            {...props}
            dispose={null}>
            <group name="Group">
                <group
                    name="Body"
                    scale={0.64}>
                    <primitive object={nodes.RightLeg} />
                    <primitive object={nodes.LeftLeg} />
                    <primitive object={nodes.Spine} />
                    <skinnedMesh
                        name="Body"
                        geometry={nodes.Body.geometry}
                        material={materials['Material_0.001']}
                        skeleton={nodes.Body.skeleton}
                    />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/models/AstronautModel.glb')
