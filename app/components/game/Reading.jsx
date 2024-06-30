import { useGameStore } from '@/lib/store'
import { Text } from '@react-three/drei'
import { useEffect, useRef } from 'react'

export default function Reading() {
    const currentReadingIndex = useGameStore((state) => state.currentReadingIndex)
    const reading = useGameStore((state) => state.readings[currentReadingIndex])
    const readingTextVisible = useGameStore((state) => state.readingTextVisible)

    const firstTextRef = useRef()
    const secondTextRef = useRef()

    if (!reading || !readingTextVisible) return null

    return (
        <group position={[0, 7, 5]}>
            <Text
                ref={firstTextRef}
                color="black"
                anchorX="center"
                anchorY="middle"
                textAlign="center"
                font={'/fonts/Enwallowify-Regular.ttf'}
                rotation={[-Math.PI / 30, 0, 0]}
                maxWidth={10}
                fontSize={0.5}>
                {reading.text}
            </Text>

            <Text
                ref={secondTextRef}
                color="black"
                anchorX="center"
                anchorY="middle"
                textAlign="right"
                position-x={-7.5}
                position-y={-4}
                font={'/fonts/Enwallowify-Regular.ttf'}
                rotation={[-Math.PI / 30, 0, 0]}
                maxWidth={4}
                fontSize={0.2}>
                {reading.author}
            </Text>
        </group>
    )
}
