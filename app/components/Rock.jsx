import { useGameStore } from '@/lib/store'
import { BallCollider, RigidBody } from '@react-three/rapier'
import Asteroid from './Asteroid'

const Rock = (props) => {
    // Define un array de posiciones correspondientes a cada índice
    const positions = [
        [20, 1.4, 20],
        [-20, 1.4, 20],
        [-26, 1, -10],
        [10, 2.4, 20],
        [23, 2, 8],
        [27, 1, -11],
    ]

    // Selecciona la posición correspondiente al índice actual
    const position = positions[props.currentReadingIndex]

    return (
        <RigidBody
            type="fixed"
            colliders={false}
            enabledRotations={[false, false, false]}
            position={position}
            onCollisionEnter={() => {
                // setCurrentReadingIndex(currentReadingIndex + 1)
            }}>
            <BallCollider args={[0.8, 0]} />
            <group>
                <Asteroid />
            </group>
        </RigidBody>
    )
}

export default Rock
