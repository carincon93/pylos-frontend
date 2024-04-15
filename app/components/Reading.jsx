import { useGameStore } from '@/lib/store'
import { Text } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'

export default function Reading() {
    const currentReadingIndex = useGameStore((state) => state.currentReadingIndex)
    const reading = useGameStore((state) => state.readings[currentReadingIndex])
    const readingTextVisible = useGameStore((state) => state.readingTextVisible)

    const firstTextRef = useRef()
    const secondTextRef = useRef()
    const [firstTextHeight, setFirstTextHeight] = useState(0)

    useEffect(() => {
        if (firstTextRef.current) {
            if (firstTextRef.current) {
                // Obtenemos el número de caracteres en el texto
                const textLength = reading.text.length
                // Calculamos la altura aproximada del texto basada en el número de caracteres y el tamaño de la fuente
                const textHeight = textLength * 0.02 // Ajusta este valor según sea necesario
                setFirstTextHeight(textHeight)
            }
        }
    }, [readingTextVisible])

    if (!reading || !readingTextVisible) return null

    return (
        <group position={[0, 0.2, 0]}>
            <Text
                ref={firstTextRef}
                color="black"
                anchorX="center"
                anchorY="middle"
                textAlign="center"
                font={'/fonts/Enwallowify-Regular.ttf'}
                rotation={[-Math.PI / 2, 0, 0]}
                maxWidth={12}
                fontSize={0.7}>
                {reading.text}
            </Text>

            <Text
                ref={secondTextRef}
                color="black"
                anchorX="center"
                anchorY="middle"
                textAlign="right"
                position-z={firstTextHeight}
                font={'/fonts/Enwallowify-Regular.ttf'}
                rotation={[-Math.PI / 2, 0, 0]}
                maxWidth={8}
                fontSize={0.4}>
                {reading.author}
            </Text>
        </group>
    )
}
