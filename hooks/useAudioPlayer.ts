import { useRef, useEffect } from 'react'
import { Howl } from 'howler'

type SoundName = 'anforaMusic' | 'running' | 'satelite' | 'buttonPressed' | 'phoneHidden' | 'phoneShowed' // Lista de nombres de sonidos

type Sounds = {
    [key in SoundName]?: Howl
}

export function useAudioPlayer() {
    const soundsRef = useRef<Sounds>({})

    // Inicializa tus sonidos
    const initSounds = () => {
        soundsRef.current = {
            anforaMusic: new Howl({
                src: ['/audios/little-astronaut.ogg'],
                loop: true,
                volume: 0.04,
            }),
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
            buttonPressed: new Howl({
                src: ['/audios/button-pressed.mp3'],
                loop: false,
                volume: 0.04,
            }),
            phoneHidden: new Howl({
                src: ['/audios/phone-hidden-sound.mp3'],
                loop: false,
                volume: 0.04,
            }),
            phoneShowed: new Howl({
                src: ['/audios/phone-sound.mp3'],
                loop: false,
                volume: 0.04,
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
