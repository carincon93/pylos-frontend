import { CapsuleCollider, RigidBody, vec3 } from '@react-three/rapier'
import { useRef, useState } from 'react'
import { CharacterAstronaut } from './CharacterAstronaut'

export const CharacterController = () => {
    const group = useRef()
    const character = useRef()
    const [animation, setAnimation] = useState('Idle')
    return (
        <group
            ref={group}
            position={[0, 18, 10]}>
            <RigidBody colliders={false}>
                <group ref={character}>
                    <CharacterAstronaut animation={animation} />
                </group>
                <CapsuleCollider
                    args={[0.4, 0.6]}
                    position={[0, 0.9, 0]}
                />
            </RigidBody>
        </group>
    )
}
