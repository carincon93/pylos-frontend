import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { StoneModel } from '../app/juego/anfora/components/Stone'
import { useGameStore } from '@/lib/store'

export function CharacterAstronaut({ animation, ...props }) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/models/CharacterAstronaut.glb')
    const { actions } = useAnimations(animations, group)
    const showMap = useGameStore((state) => state.showMap)

    useEffect(() => {
        actions[animation].reset().fadeIn(0.2).play()
        return () => actions[animation]?.fadeOut(0.2)
    }, [animation])

    return (
        <group
            ref={group}
            {...props}>
            <group name="Scene">
                <group
                    name="Armature"
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={0.02}>
                    <skinnedMesh
                        name="Body"
                        geometry={nodes.Body.geometry}
                        material={materials['Material.001']}
                        skeleton={nodes.Body.skeleton}
                        castShadow
                        receiveShadow
                    />
                    <primitive object={nodes.mixamorigHips} />
                </group>

                {showMap && <StoneModel scale={280} />}
            </group>
        </group>
    )
}

useGLTF.preload('/models/CharacterAstronaut.glb')
