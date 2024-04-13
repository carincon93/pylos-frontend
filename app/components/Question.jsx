import { useGameStore } from '@/lib/store'
import { Sphere, Text } from '@react-three/drei'
import { BallCollider, RigidBody } from '@react-three/rapier'

export default function Question(props) {
    const currentQuestionIndex = useGameStore((state) => state.currentQuestionIndex)
    const setCurrentQuestionIndex = useGameStore((state) => state.setCurrentQuestionIndex)
    const setCurrentReadingIndex = useGameStore((state) => state.setCurrentReadingIndex)
    const setReadingTextVisible = useGameStore((state) => state.setReadingTextVisible)
    const currentReadingIndex = useGameStore((state) => state.currentReadingIndex)

    const handleAnswer = useGameStore((state) => state.handleAnswer)

    if (!props.reading) return null

    const question = props.reading.questions[currentQuestionIndex]

    if (!question) return null

    return (
        <>
            <Text
                color="black"
                anchorX="center"
                anchorY="middle"
                textAlign="center"
                position-z={-4}
                font={'/fonts/Enwallowify-Regular.ttf'}
                rotation={[-Math.PI / 2, 0, 0]}
                maxWidth={22}
                fontSize={0.7}>
                {question.text}
            </Text>

            {question.answers.map((answer, index) => (
                <group key={answer.id}>
                    <RigidBody
                        type="fixed"
                        colliders={false}
                        enabledRotations={[false, false, false]}
                        position={[0, 0, index * 6]} // Ajustar la posición Z basada en el índice
                        onCollisionEnter={() => {
                            handleAnswer(answer)
                        }}>
                        <BallCollider args={[0.8, 0]} />
                        <group>
                            <Sphere args={[0.5, 16, 16]}>
                                <meshStandardMaterial color="gray" />
                            </Sphere>
                        </group>
                    </RigidBody>

                    <Text
                        color="gray"
                        anchorX="center"
                        anchorY="middle"
                        textAlign="right"
                        position={[0, 0.5, index * 6]} // Texto sigue la misma posición Z que la esfera
                        font={'/fonts/Enwallowify-Regular.ttf'}
                        rotation={[-Math.PI / 2, 0, 0]}
                        maxWidth={10}
                        fontSize={0.7}>
                        {answer.text}
                    </Text>
                </group>
            ))}

            <RigidBody
                type="fixed"
                colliders={false}
                enabledRotations={[false, false, false]}
                position={[-8, 0, question.answers.length * 2]} // Ajustar la posición Z basada en el índice
                onCollisionEnter={() => {
                    setCurrentQuestionIndex(currentQuestionIndex + 1)
                    if (props.reading.questions.length == currentQuestionIndex + 1) {
                        setReadingTextVisible(false)
                        setCurrentReadingIndex(currentReadingIndex + 1)
                    }
                    // handleAnswer(answer)
                }}>
                <BallCollider args={[0.8, 0]} />
                <group>
                    <Sphere args={[0.5, 16, 16]}>
                        <meshStandardMaterial color="gray" />
                    </Sphere>
                </group>
            </RigidBody>
        </>
    )
}
