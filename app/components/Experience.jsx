import { Box, Center, ContactShadows, Environment, Sphere, Text, Text3D, useFont } from '@react-three/drei'
import { BallCollider, CuboidCollider, CylinderCollider, RigidBody } from '@react-three/rapier'
import { CharacterController } from './CharacterController'
import Rock from './Rock'
import Reading from './Reading'
import Question from './Question'
import Stage from './Stage'
import Arch from './Arch'
import Desert from './Desert'
import { useGameStore } from '@/lib/store'

export const Experience = () => {
    const currentReadingIndex = useGameStore((state) => state.currentReadingIndex)
    const showFirstStage = useGameStore((state) => state.showFirstStage)
    const setCurrentReadingIndex = useGameStore((state) => state.setCurrentReadingIndex)

    const plane = showFirstStage ? [100, 80] : [50, 80]

    return (
        <>
            {/* LIGHTS */}
            <Environment preset="sunset" />

            <directionalLight
                position={[5, 5, 5]}
                intensity={0.3}
                castShadow
                color={'#c3c29e'}
            />

            <group position-y={-1}>
                {/* FLOOR */}
                <RigidBody
                    colliders={false}
                    type="fixed">
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={plane} />
                        <meshBasicMaterial
                            color={showFirstStage ? '#c85b79' : '#c3c29e'}
                            toneMapped={false}
                        />
                    </mesh>
                    <CuboidCollider args={[50, 0.1, 40]} />
                </RigidBody>

                {showFirstStage && (
                    <>
                        {/* STAGE */}
                        <RigidBody
                            colliders={false}
                            type="fixed">
                            <CuboidCollider args={[28, 0.6, 28]} />
                        </RigidBody>
                        <RigidBody
                            colliders={false}
                            type="fixed">
                            <CuboidCollider args={[23, 0.8, 26]} />
                        </RigidBody>
                        <RigidBody
                            colliders={false}
                            type="fixed">
                            <CuboidCollider args={[21, 1, 24]} />
                        </RigidBody>

                        <RigidBody
                            position={[0, 1.2, 0]}
                            colliders={false}
                            type="fixed">
                            <CuboidCollider args={[20, 10, 20]} />
                        </RigidBody>

                        <Stage position-y={-0.1} />

                        <Rock currentReadingIndex={currentReadingIndex} />
                    </>
                )}

                <Reading />

                <Question />

                <Arch />

                <Desert />

                {/* CHARACTER */}
                <CharacterController />
            </group>
        </>
    )
}
