import { useRef, useEffect } from 'react'
import { Howl } from 'howler'

type SoundName = 'running' | 'satelite' // Lista de nombres de sonidos

type Sounds = {
    [key in SoundName]?: Howl
}

export function useAudioPlayer() {
    const soundsRef = useRef<Sounds>({})

    // Inicializa tus sonidos
    const initSounds = () => {
        soundsRef.current = {
            running: new Howl({
                src: ['/audios/running-sound.ogg'],
                loop: true,
                volume: 0.04,
            }),
            satelite: new Howl({
                src: ['/audios/satelite-sound.mp3'],
                loop: false,
                volume: 0.05,
            }),
            // Agrega más sonidos aquí
        }
    }

    // Reproduce un sonido específico
    const playSound = (soundName: SoundName) => {
        const sound = soundsRef.current[soundName]
        if (sound) {
            sound.play()
        } else {
            console.error(`Sound "${soundName}" not found`)
        }
    }

    // Detiene un sonido específico
    const stopSound = (soundName: SoundName) => {
        const sound = soundsRef.current[soundName]
        if (sound) {
            sound.stop()
        } else {
            console.error(`Sound "${soundName}" not found`)
        }
    }

    // Pausa un sonido específico
    const pauseSound = (soundName: SoundName) => {
        const sound = soundsRef.current[soundName]
        if (sound) {
            sound.pause()
        } else {
            console.error(`Sound "${soundName}" not found`)
        }
    }

    // Inicializa los sonidos cuando el hook se monta
    useEffect(() => {
        initSounds()
    }, [])

    return { playSound, stopSound, pauseSound }
}
