import { useState, useEffect, useCallback } from 'react'

export function useAudioPlayer() {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false) // Para rastrear el estado de reproducción

    // Función para reproducir una parte específica del audio
    const playAudio = useCallback(
        (inicio: number, fin: number, audioSource: string) => {
            // Pausar y resetear el audio anterior si está en reproducción
            if (audio) {
                audio.pause()
                audio.currentTime = 0 // Resetear el tiempo si es necesario
            }

            // Crear y configurar el nuevo audio
            const newAudio = new Audio(audioSource)
            newAudio.currentTime = inicio
            newAudio.play()
            setIsPlaying(true)
            setAudio(newAudio)

            // Configurar el evento 'ended'
            newAudio.onended = () => {
                setIsPlaying(false)
            }

            // Detener el audio después de la duración especificada si el audio no ha terminado naturalmente
            setTimeout(() => {
                if (newAudio && !newAudio.ended) {
                    newAudio.pause()
                    newAudio.currentTime = 0
                    setIsPlaying(false)
                }
            }, (fin - inicio) * 1000)
        },
        [audio],
    )

    // Limpiar el recurso de audio cuando el componente que usa este hook se desmonte
    useEffect(() => {
        return () => {
            if (audio) {
                audio.pause()
                audio.src = '' // Esto libera el recurso de audio asignado
            }
        }
    }, [audio])

    return { playAudio, isPlaying }
}
