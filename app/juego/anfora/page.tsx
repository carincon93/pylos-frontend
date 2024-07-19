'use client'

import { AnforaExperience } from './components/AnforaExperience'
import AnforaForm from './components/Ipad'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { saveObjetoNaveReparado } from '@/lib/actions'
import { ObjetoNaveReparado } from '@/types/MyTypes'
import { useGameStore } from '@/lib/store'
import { KeyboardControls, Loader, SoftShadows, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { fetcher } from '@/utils/fetcher'
import useSWR, { mutate } from 'swr'
import LoadingScreen from '@/components/LoadingScreen'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'

const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
    { name: 'reset', keys: ['KeyR'] },
    { name: 'run', keys: ['Space'] },
]

// const audio = new Audio('/audios/game-music-loop-6.mp3')

function Anfora() {
    const { data: readings } = useSWR<any>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/lectura/anfora`, fetcher)
    const { data: objetosNaveReparados } = useSWR<ObjetoNaveReparado[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/objeto-nave-reparado/obtener/por-usuario`, fetcher)
    const activeForm = useGameStore((state) => state.activeForm)
    const setActiveForm = useGameStore((state) => state.setActiveForm)
    const setReadings = useGameStore((state) => state.setReadings)
    const setInGame = useGameStore((state) => state.setInGame)
    const setShowMap = useGameStore((state) => state.setShowMap)
    const showMap = useGameStore((state) => state.showMap)
    const clickDisabled = useGameStore((state) => state.clickDisabled)
    const setClickDisabled = useGameStore((state) => state.setClickDisabled)

    const motorItem = objetosNaveReparados?.find((item) => item.objeto === 'motor')
    const reactorItem = objetosNaveReparados?.find((item) => item.objeto === 'reactor')
    const sistemaNavegacionItem = objetosNaveReparados?.find((item) => item.objeto === 'sistema de navegación')
    const panelSolarItem = objetosNaveReparados?.find((item) => item.objeto === 'panel solar')
    const combustibleItem = objetosNaveReparados?.find((item) => item.objeto === 'combustible')
    const [showTablet, setShowTablet] = useState(false)
    const [showInfoPopup, setShowInfoPopup] = useState(false)
    const [showControlsPopup, setShowControlsPopup] = useState(false)
    const [start, setStart] = useState(false)

    const { playAudio, isPlaying } = useAudioPlayer()

    useEffect(() => {
        setReadings(readings)
    }, [readings, setReadings])

    useEffect(() => {
        setTimeout(() => {
            setShowTablet(activeForm)
        }, 500)
    }, [activeForm])

    useEffect(() => {
        document.body.classList.add('overflow-hidden')
        document.body.classList.add('touch-none')
        document.body.classList.add('select-none')
        const infoPopupStorage = localStorage.getItem('info_popup')

        if (!infoPopupStorage) {
            setShowInfoPopup(true)
        }

        const element = document.getElementById('app-menu')
        if (element) {
            element.remove()
        }

        setInGame(true)
    }, [])

    // useEffect(() => {
    //     if (start) {
    //         audio.play()
    //         audio.loop = true
    //     }
    // }, [start])

    const handleSubmit = async (object: string) => {
        const data: Partial<ObjetoNaveReparado> = {
            planeta: 'anfora',
            objeto: object,
        }

        try {
            await saveObjetoNaveReparado(data)
        } catch (error) {
            console.error('Error al guardar el objeto:', error)
        } finally {
            mutate(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/objeto-nave-reparado/obtener/por-usuario`)
            setActiveForm(false)
        }
    }

    return (
        <>
            <KeyboardControls map={keyboardMap}>
                <Canvas
                    shadows
                    camera={{ fov: 40, position: [20, 20, 20] }}
                    style={{ height: '100vh' }}
                    onMouseOver={() => setClickDisabled(false)}>
                    <color
                        attach="background"
                        args={['#9104a4']}
                    />
                    <Suspense fallback={null}>
                        <SoftShadows size={42} />
                        <AnforaExperience />
                    </Suspense>
                </Canvas>
                <LoadingScreen
                    started={start}
                    onStarted={setStart}
                />
                <Stats />
            </KeyboardControls>

            {/* UI */}
            <div
                className="select-none"
                onMouseOver={() => setClickDisabled(true)}>
                <div className="fixed left-10 top-10">
                    <h1 className="text-2xl text-white font-black">
                        PYLOS | <span className="font-edu">ANFORA</span>
                    </h1>
                </div>

                {!activeForm && (
                    <>
                        <div
                            className="fixed bottom-32 left-2 sm:bottom-10 space-y-2 hover:opacity-60 transition-opacity"
                            onClick={() => setShowInfoPopup(true)}
                            onMouseOver={() => setClickDisabled(true)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-10 sm:size-12 text-white">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                                />
                            </svg>
                        </div>

                        <div
                            className="fixed bottom-32 left-14 sm:left-16 sm:bottom-10 space-y-2 hover:opacity-60 transition-opacity"
                            onClick={() => setShowControlsPopup(true)}
                            onMouseOver={() => setClickDisabled(true)}>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="currentColor"
                                className="size-10 sm:size-12 text-white">
                                <path
                                    d="M6.00014 11H10.0001M8.00014 9V13M15.0001 12H15.0101M18.0001 10H18.0101M10.4491 5H13.5512C16.1761 5 17.4885 5 18.5187 5.49743C19.4257 5.9354 20.1793 6.63709 20.6808 7.51059C21.2503 8.5027 21.3438 9.81181 21.5309 12.43L21.7769 15.8745C21.8975 17.5634 20.5599 19 18.8667 19C18.0008 19 17.1796 18.6154 16.6253 17.9502L16.2501 17.5C15.907 17.0882 15.7354 16.8823 15.54 16.7159C15.1305 16.3672 14.6346 16.1349 14.1045 16.0436C13.8516 16 13.5836 16 13.0476 16H10.9527C10.4167 16 10.1487 16 9.89577 16.0436C9.36563 16.1349 8.86981 16.3672 8.46024 16.7159C8.26487 16.8823 8.09329 17.0882 7.75013 17.5L7.37497 17.9502C6.82064 18.6154 5.99949 19 5.13359 19C3.44037 19 2.10275 17.5634 2.22339 15.8745L2.46942 12.43C2.65644 9.81181 2.74994 8.5027 3.31951 7.51059C3.82098 6.63709 4.57458 5.9354 5.48159 5.49743C6.51176 5 7.8242 5 10.4491 5Z"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <AlertDialog open={showInfoPopup}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle></AlertDialogTitle>
                                    <h1 className="text-center text-2xl font-semibold !mb-4">¡Ayuda a reparar la nave Nebulón!</h1>

                                    <div className="text-sm">
                                        Objetivo del juego: Encuentra las 5 partes perdidas de la nave Nebulón en el planeta Ánfora.
                                        <ol className="list-decimal mt-4 pl-4">
                                            <li>
                                                <strong>Explora el planeta Ánfora:</strong> Busca las partes perdidas de la nave mientras exploras este increíble planeta.
                                            </li>
                                            <li>
                                                <strong>Haz clic en las partes:</strong> Cada vez que encuentres una parte de la nave, haz clic en ella.
                                            </li>
                                            <li>
                                                <strong>Responde la lectura:</strong> En tu móvil aparecerá una lectura que debes responder correctamente para reparar esa parte de la nave.
                                            </li>
                                            <li>
                                                <strong>Recupera todas las partes:</strong> Cuando hayas encontrado y reparado las 5 partes, la nave Nebulón estará lista para continuar su viaje.
                                            </li>
                                            <li>
                                                <div className="flex items-center mt-4">
                                                    <img
                                                        src="/satelite.png"
                                                        className="w-14 mr-2"
                                                    />
                                                    Dando clic en el satélite puedes ubicar las partes perdidas.
                                                </div>

                                                <div className="flex items-center mt-4">
                                                    <img
                                                        src="/marker.png"
                                                        className="w-8 mx-4"
                                                    />
                                                    Las partes estarán marcadas con este icono.
                                                </div>

                                                <div className="flex items-center mt-4">
                                                    <img
                                                        src="/user-marker.png"
                                                        className="w-6 mx-5"
                                                    />
                                                    Posición del Pylonauta.
                                                </div>
                                            </li>
                                        </ol>
                                        <strong className="block mt-4 text-center">¡Diviértete explorando y reparando la nave Nebulón!</strong>
                                    </div>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="mt-10">
                                    <AlertDialogCancel
                                        className="text-white w-full"
                                        onClick={() => {
                                            localStorage.setItem('info_popup', 'opened'), setClickDisabled(false), setShowInfoPopup(false)
                                        }}>
                                        Entendido
                                    </AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog open={showControlsPopup}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle></AlertDialogTitle>

                                    <h1 className="text-center text-2xl font-semibold !mb-4">Controles</h1>
                                    <div className="flex items-center">
                                        <div>
                                            <div className="mb-2">
                                                <div className="font-semibold text-center border-2 rounded-xl p-2 border-gray-200 mx-auto w-14">W</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="font-semibold text-center border-2 rounded-xl p-2 border-gray-200 mx-auto w-14">A</div>
                                                <div className="font-semibold text-center border-2 rounded-xl p-2 border-gray-200 mx-auto w-14">S</div>
                                                <div className="font-semibold text-center border-2 rounded-xl p-2 border-gray-200 mx-auto w-14">D</div>
                                            </div>
                                        </div>
                                        <small className="block text-center ml-10">| Caminar</small>
                                    </div>

                                    <div className="flex items-center !mt-10">
                                        <div>
                                            <div className="font-semibold text-center border-2 rounded-xl p-2 border-gray-200 mx-auto w-44 ml-1">Espacio</div>
                                        </div>

                                        <small className="block text-center ml-12">| Correr</small>
                                    </div>

                                    <div className="flex items-center !mt-10">
                                        <div>
                                            <div className="font-semibold text-center border-2 rounded-xl p-2 border-gray-200 w-14 mx-16">R</div>
                                        </div>

                                        <small className="block text-center ml-10">| Restablecer posición</small>
                                    </div>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="mt-10">
                                    <AlertDialogCancel
                                        className="text-white w-full"
                                        onClick={() => {
                                            setClickDisabled(false), setShowControlsPopup(false)
                                        }}>
                                        Entendido
                                    </AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <div className="fixed lg:right-10 left-0 right-0 mx-auto sm:w-[432px] bottom-6 space-y-2">
                            <div className="flex gap-2">
                                <div
                                    className={`font-black text-center rounded-xl shadow-inner shadow-gray-600/40 border-2 p-2 mx-auto w-20 h-20 flex items-center justify-center bg-white/80 ${
                                        motorItem ? 'text-pylos-600 border-pylos-600' : 'text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img src="/anfora/motor.png" />
                                </div>

                                <div
                                    className={`font-black text-center rounded-xl shadow-inner shadow-gray-600/40 border-2 p-2 mx-auto w-20 h-20 flex items-center justify-center bg-white/80 ${
                                        reactorItem ? 'text-pylos-600 border-pylos-600' : 'text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img src="/anfora/reactor.png" />
                                </div>

                                <div
                                    className={`font-black text-center rounded-xl shadow-inner shadow-gray-600/40 border-2 p-2 mx-auto w-20 h-20 flex items-center justify-center bg-white/80 ${
                                        sistemaNavegacionItem ? 'text-pylos-600 border-pylos-600' : 'text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img src="/anfora/navegacion.png" />
                                </div>

                                <div
                                    className={`font-black text-center rounded-xl shadow-inner shadow-gray-600/40 border-2 p-2 mx-auto w-20 h-20 flex items-center justify-center bg-white/80 ${
                                        panelSolarItem ? 'text-pylos-600 border-pylos-600' : 'text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img src="/anfora/panel.png" />
                                </div>

                                <div
                                    className={`font-black text-center rounded-xl shadow-inner shadow-gray-600/40 border-2 p-2 mx-auto w-20 h-20 flex items-center justify-center bg-white/80 ${
                                        combustibleItem ? 'text-pylos-600 border-pylos-600' : 'text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img
                                        src="/anfora/bidon.png"
                                        className="w-10"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="fixed bottom-32 sm:bottom-4 right-0 hover:opacity-80 transition-opacity select-none">
                            <img
                                onClick={() => {
                                    setShowMap(!showMap), playAudio(0, 2, '/audios/satelite-sound.mp3')
                                }}
                                onMouseOver={() => setClickDisabled(true)}
                                onMouseLeave={() => setClickDisabled(false)}
                                src="/satelite.png"
                                className={`${showMap ? 'grayscale' : ''} w-20 sm:w-32`}
                            />
                        </div>
                    </>
                )}
            </div>

            <AnforaForm handleSubmit={handleSubmit} />
        </>
    )
}

export default Anfora
