import { useGameStore } from '@/lib/store'
import { Text } from '@react-three/drei'
import { BallCollider, RigidBody } from '@react-three/rapier'
import Asteroid from './Asteroid'
import Question from './Question'

export default function Rock(props) {
    const setReadingTextVisible = useGameStore((state) => state.setReadingTextVisible)
    const setCurrentReadingIndex = useGameStore((state) => state.setCurrentReadingIndex)
    const reading = useGameStore((state) => state.readings[props.readingIndex])
    const readingTextVisible = useGameStore((state) => state.readingTextVisible)
    const setCurrentQuestionIndex = useGameStore((state) => state.setCurrentQuestionIndex)

    if (!reading) return null

    return (
        <>
            <RigidBody
                type="fixed"
                colliders={false}
                enabledRotations={[false, false, false]}
                position={reading.position}
                onCollisionEnter={() => {
                    setCurrentReadingIndex(props.readingIndex)
                    setReadingTextVisible(true)
                    setCurrentQuestionIndex(0)
                }}>
                <BallCollider args={[0.8, 0]} />
                <group>
                    <Asteroid />
                </group>
            </RigidBody>

            {readingTextVisible && (
                <group position={[-70, 0.1, 0]}>
                    <Text
                        color="black"
                        anchorX="center"
                        anchorY="middle"
                        textAlign="center"
                        position-z={-8}
                        font={'/fonts/Enwallowify-Regular.ttf'}
                        rotation={[-Math.PI / 2, 0, 0]}
                        maxWidth={22}
                        fontSize={0.7}>
                        {reading.text}
                    </Text>

                    <Question reading={reading} />
                </group>
            )}
        </>
    )
}
