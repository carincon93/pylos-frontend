import { Box, Center, ContactShadows, Environment, Sphere, Text, Text3D, useFont } from '@react-three/drei'
import { BallCollider, CuboidCollider, CylinderCollider, RigidBody } from '@react-three/rapier'
import { CharacterController } from './CharacterController'
import Rock from './Rock'
import { useGameStore } from '@/lib/store'
import { useState } from 'react'

export const Experience = () => {
    const currentReadingIndex = useGameStore((state) => state.currentReadingIndex)
    const setCameraText = useGameStore((state) => state.setCameraText)

    return (
        <>
            {/* LIGHTS */}
            <Environment preset="sunset" />

            <directionalLight
                position={[5, 5, 5]}
                intensity={0.3}
                castShadow
                color={'#9e69da'}
            />

            <group position-y={-1}>
                <RigidBody
                    colliders={false}
                    type="fixed"
                    position={[-57.5, 0, 4]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[1, 1]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            toneMapped={false}
                        />
                    </mesh>
                    <CuboidCollider args={[0.5, 0, 0.5]} />
                </RigidBody>
                <RigidBody
                    colliders={false}
                    type="fixed"
                    position={[-56.5, 0, 4]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[1, 1]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            toneMapped={false}
                        />
                    </mesh>
                    <CuboidCollider args={[0.5, 0, 0.5]} />
                </RigidBody>
                <RigidBody
                    colliders={false}
                    type="fixed"
                    position={[-55.5, 0, 4]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[1, 1]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            toneMapped={false}
                        />
                    </mesh>
                    <CuboidCollider args={[0.5, 0, 0.5]} />
                </RigidBody>
                <RigidBody
                    colliders={false}
                    type="fixed"
                    position={[-54.5, 0, 4]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[1, 1]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            toneMapped={false}
                        />
                    </mesh>
                    <CuboidCollider args={[0.5, 0, 0.5]} />
                </RigidBody>
                <RigidBody
                    colliders={false}
                    type="fixed"
                    position={[-53.5, 0, 4]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[1, 1]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            toneMapped={false}
                        />
                    </mesh>
                    <CuboidCollider args={[0.5, 0, 0.5]} />
                </RigidBody>
                <RigidBody
                    colliders={false}
                    type="fixed"
                    position={[-53.5, 0, 3]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[1, 1]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            toneMapped={false}
                        />
                    </mesh>
                    <CuboidCollider args={[0.5, 0, 0.5]} />
                </RigidBody>
                <RigidBody
                    colliders={false}
                    type="fixed"
                    position={[-53.5, 0, 2]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[1, 1]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            toneMapped={false}
                        />
                    </mesh>
                    <CuboidCollider args={[0.5, 0, 0.5]} />
                </RigidBody>
                <RigidBody
                    colliders={false}
                    type="fixed"
                    position={[-52.5, 0, 2]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[1, 1]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            toneMapped={false}
                        />
                    </mesh>
                    <CuboidCollider args={[0.5, 0, 0.5]} />
                </RigidBody>
                <RigidBody
                    colliders={false}
                    type="fixed"
                    position={[-51.5, 0, 2]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[1, 1]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            toneMapped={false}
                        />
                    </mesh>
                    <CuboidCollider args={[0.5, 0, 0.5]} />
                </RigidBody>
                <RigidBody
                    colliders={false}
                    type="fixed"
                    position={[-51.5, 0, 1]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[1, 1]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            toneMapped={false}
                        />
                    </mesh>
                    <CuboidCollider args={[0.5, 0, 0.5]} />
                </RigidBody>
                <RigidBody
                    colliders={false}
                    type="fixed"
                    position={[-51.5, 0, 0]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[1, 1]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            toneMapped={false}
                        />
                    </mesh>
                    <CuboidCollider args={[0.5, 0, 0.5]} />
                </RigidBody>

                <RigidBody
                    colliders={false}
                    type="fixed"
                    position={[-50.5, 0, 0]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[1, 1]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            toneMapped={false}
                        />
                    </mesh>
                    <CuboidCollider args={[0.5, 0, 0.5]} />
                </RigidBody>

                <RigidBody
                    colliders={false}
                    type="fixed"
                    position={[-70, 0, 0]}
                    onCollisionEnter={() => {
                        setCameraText(true)
                    }}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[24, 48]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            toneMapped={false}
                        />
                    </mesh>
                    <CuboidCollider args={[12, 0, 24]} />
                </RigidBody>

                {/* FLOOR */}
                <RigidBody
                    colliders={false}
                    type="fixed"
                    onCollisionEnter={() => {
                        setCameraText(false)
                    }}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[100, 100]} />
                        <meshBasicMaterial
                            color="#e3daf7"
                            toneMapped={false}
                        />
                    </mesh>
                    <CuboidCollider args={[50, 0.1, 50]} />
                </RigidBody>

                {/* STAGE */}
                {/* <Stage position-y={-0.92} /> */}

                {currentReadingIndex == 0 && <Rock readingIndex={0} />}
                {currentReadingIndex == 1 && <Rock readingIndex={1} />}

                {/* <group>
                    <Text
                        color="black"
                        anchorX="center"
                        anchorY="middle"
                        textAlign="center"
                        font={'/fonts/Enwallowify-Regular.ttf'}
                        rotation={[-Math.PI / 2, 0, 0]}
                        position={[12, 0.2, 18]}
                        maxWidth={22}
                        fontSize={0.7}
                        fillOpacity={isCollisioned ? 0 : 1}>
                        ¡Cuidado, la Luna sueña! No despierten a la Luna, no la despierten que sueña, que hoy celebra su cumpleaños con lunas de otros planetas. Le cantaron las estrellas, han llegado
                        los cometas ¡Si hasta el Sol fue a saludarla, de corbata y con chaqueta! No despierten a la Luna. ¡Silencio cuando ella sueña!, que festeja su cumpleaños con lunas, soles y
                        estrellas María Luisa Silva. Cuentiversos para reír y jugar Galería Cecilia Palma. Santiago 2008.
                    </Text>
                </group> */}

                {/* CHARACTER */}
                <CharacterController />
            </group>
        </>
    )
}
