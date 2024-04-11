import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody, vec3 } from '@react-three/rapier'
import { useEffect, useRef } from 'react'
import { gameStates, useGameStore } from '@/lib/store'
import Character from './Character'

import * as THREE from 'three'
import { Controls } from '@/lib/utils'

const JUMP_FORCE = 0.5
const MOVEMENT_SPEED = 0.1
const MAX_VEL = 3
const RUN_VEL = 1.5

export const CharacterController = () => {
    const { characterState, setCharacterState, gameState } = useGameStore((state) => ({
        character: state.characterState,
        setCharacterState: state.setCharacterState,
        gameState: state.gameState,
    }))
    const jumpPressed = useKeyboardControls((state) => state[Controls.jump])
    const leftPressed = useKeyboardControls((state) => state[Controls.left])
    const rightPressed = useKeyboardControls((state) => state[Controls.right])
    const backPressed = useKeyboardControls((state) => state[Controls.back])
    const forwardPressed = useKeyboardControls((state) => state[Controls.forward])
    const rigidbody = useRef()
    const isOnFloor = useRef(true)

    useFrame((state, delta) => {
        const impulse = { x: 0, y: 0, z: 0 }
        if (jumpPressed && isOnFloor.current) {
            impulse.y += JUMP_FORCE
            isOnFloor.current = false
        }

        if (rigidbody.current) {
            const linvel = rigidbody.current.linvel()
            let changeRotation = false

            if (rightPressed && linvel.x < MAX_VEL) {
                impulse.x += MOVEMENT_SPEED
                changeRotation = true
            }
            if (leftPressed && linvel.x > -MAX_VEL) {
                impulse.x -= MOVEMENT_SPEED
                changeRotation = true
            }
            if (backPressed && linvel.z < MAX_VEL) {
                impulse.z += MOVEMENT_SPEED
                changeRotation = true
            }
            if (forwardPressed && linvel.z > -MAX_VEL) {
                impulse.z -= MOVEMENT_SPEED
                changeRotation = true
            }

            rigidbody.current.applyImpulse(impulse, true)

            let targetAngle

            // Norte (Arriba)
            if (forwardPressed && !rightPressed && !leftPressed) {
                targetAngle = Math.PI // 180 grados en radianes
            }
            // Este (Derecha)
            if (rightPressed && !forwardPressed && !backPressed) {
                targetAngle = Math.PI / 2 // 90 grados en radianes
            }
            // Sur (Abajo)
            if (backPressed && !rightPressed && !leftPressed) {
                targetAngle = 0 // 0 radianes
            }
            // Oeste (Izquierda)
            if (leftPressed && !forwardPressed && !backPressed) {
                targetAngle = -Math.PI / 2 // -90 grados en radianes
            }

            // Diagonales
            // Noreste (Arriba + Derecha)
            if (forwardPressed && rightPressed) {
                targetAngle = (3 * Math.PI) / 4 // 135 grados en radianes
            }
            // Sureste (Abajo + Derecha)
            if (backPressed && rightPressed) {
                targetAngle = Math.PI / 4 // 45 grados en radianes
            }
            // Suroeste (Abajo + Izquierda)
            if (backPressed && leftPressed) {
                targetAngle = -Math.PI / 4 // -45 grados en radianes
            }
            // Noroeste (Arriba + Izquierda)
            if (forwardPressed && leftPressed) {
                targetAngle = (-3 * Math.PI) / 4 // -135 grados en radianes
            }

            // Aplicar rotación si targetAngle está definido
            if (targetAngle !== undefined) {
                character.current.rotation.y = targetAngle
            }

            if (Math.abs(linvel.x) > RUN_VEL || Math.abs(linvel.z) > RUN_VEL) {
                if (characterState !== 'Fly1') {
                    setCharacterState('Fly1')
                }
            } else {
                if (characterState !== 'Idle') {
                    setCharacterState('Idle')
                }
            }
        }

        // CAMERA FOLLOW
        const characterWorldPosition = character.current.getWorldPosition(new THREE.Vector3())

        const targetCameraPosition = new THREE.Vector3(characterWorldPosition.x, 0, characterWorldPosition.z + 14)

        if (gameState === gameStates.GAME) {
            targetCameraPosition.y = 6
        }
        if (gameState !== gameStates.GAME) {
            targetCameraPosition.y = 10
        }

        state.camera.position.lerp(targetCameraPosition, delta * 2)

        const targetLookAt = new THREE.Vector3(characterWorldPosition.x, 0, characterWorldPosition.z)

        const direction = new THREE.Vector3()
        state.camera.getWorldDirection(direction)

        const position = new THREE.Vector3()
        state.camera.getWorldPosition(position)

        const currentLookAt = position.clone().add(direction)
        const lerpedLookAt = new THREE.Vector3()

        lerpedLookAt.lerpVectors(currentLookAt, targetLookAt, delta * 2)

        state.camera.lookAt(lerpedLookAt)
    })

    const character = useRef()

    const resetPosition = () => {
        rigidbody.current.setTranslation(vec3({ x: 0, y: 0, z: 0 }))
        rigidbody.current.setLinvel(vec3({ x: 0, y: 0, z: 0 }))
    }

    useEffect(() => useGameStore.subscribe((state) => state.currentStage, resetPosition), [])

    useEffect(() => useGameStore.subscribe((state) => state.wrongAnswers, resetPosition), [])

    return (
        <group>
            <RigidBody
                ref={rigidbody}
                colliders={false}
                scale={[0.5, 0.5, 0.5]}
                enabledRotations={[false, false, false]}
                onCollisionEnter={() => {
                    isOnFloor.current = true
                }}>
                <CapsuleCollider
                    args={[0.8, 0.4]}
                    position={[0, 1.2, 0]}
                />
                <group ref={character}>
                    <Character />
                </group>
            </RigidBody>
        </group>
    )
}
