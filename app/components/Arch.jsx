import { useGameStore } from '@/lib/store'
import { useAnimations, useGLTF } from '@react-three/drei'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import React, { useEffect, useRef } from 'react'

export default function Arch(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/models/Arch.glb')
    const setReadingTextVisible = useGameStore((state) => state.setReadingTextVisible)
    const setCameraText = useGameStore((state) => state.setCameraText)
    const setCurrentQuestionIndex = useGameStore((state) => state.setCurrentQuestionIndex)
    const setShowFirstStage = useGameStore((state) => state.setShowFirstStage)
    const showFirstStage = useGameStore((state) => state.showFirstStage)

    const handleCollisionEnter = () => {
        setShowFirstStage(!showFirstStage)
        setReadingTextVisible(true)
        setCurrentQuestionIndex(0)
        setCameraText(true)
    }

    return (
        <RigidBody
            // position={[-4, 1.2, 28]}
            position={[-4, 0, 28]}
            colliders={false}
            type="fixed"
            onCollisionEnter={() => {
                handleCollisionEnter()
            }}>
            <CuboidCollider
                position={[0, 0.8, 0]}
                args={[1, 1.5, 0]}
            />
            <group
                ref={group}
                {...props}
                dispose={null}
                scale={1.6}>
                <mesh
                    name="Cube001"
                    geometry={nodes.Cube001.geometry}
                    material={materials['Material.003']}>
                    <meshStandardMaterial color="brown" />
                </mesh>
            </group>
        </RigidBody>
    )
}

useGLTF.preload('/models/Arch.glb')
