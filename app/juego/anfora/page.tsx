'use client'

import { AnforaExperience } from './components/AnforaExperience'
import Ipad from './components/Ipad'
import LoadingScreen from '@/components/LoadingScreen'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import Link from 'next/link'
import { getProfile, saveCalificacionPylos, saveObjetoNaveReparado } from '@/lib/actions'
import { CalificacionPylos, ChatEmojis, ObjetoNaveReparado, Usuario } from '@/types/MyTypes'
import { useGameStore } from '@/lib/store'
import { KeyboardControls, Loader, SoftShadows, Stats } from '@react-three/drei'
import { fetcher } from '@/utils/fetcher'
import { MUNDOS_ROUTE } from '@/utils/routes'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import useMonitorFPS from '@/hooks/useMonitorFPS'
import TablaPosiciones from '../usuarios/_tabla-posiciones'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
    { name: 'reset', keys: ['KeyR'] },
    { name: 'run', keys: ['Space'] },
]

function Anfora() {
    const [profile, setProfile] = useState<Usuario>()

    const { data: readings } = useSWR<any>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/lectura/anfora`, fetcher)
    const { data: objetosNaveReparados } = useSWR<ObjetoNaveReparado[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/objeto-nave-reparado/obtener/por-usuario`, fetcher)
    const { data: chatEmojis } = useSWR<ChatEmojis>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/chat-emojis/${profile?.id}`, fetcher)

    const activeForm = useGameStore((state) => state.activeForm)
    const setActiveForm = useGameStore((state) => state.setActiveForm)
    const setReadings = useGameStore((state) => state.setReadings)
    const setInGame = useGameStore((state) => state.setInGame)
    const setShowMap = useGameStore((state) => state.setShowMap)
    const showMap = useGameStore((state) => state.showMap)
    const setClickDisabled = useGameStore((state) => state.setClickDisabled)
    const showMenu = useGameStore((state) => state.showMenu)
    const setShowMenu = useGameStore((state) => state.setShowMenu)
    const isPageVisible = useGameStore((state) => state.isPageVisible)
    const setResetCharacterPosition = useGameStore((state) => state.setResetCharacterPosition)

    const motorItem = objetosNaveReparados?.find((item) => item.objeto === 'motor')
    const reactorItem = objetosNaveReparados?.find((item) => item.objeto === 'reactor')
    const sistemaNavegacionItem = objetosNaveReparados?.find((item) => item.objeto === 'navegacion')
    const panelSolarItem = objetosNaveReparados?.find((item) => item.objeto === 'panel')
    const combustibleItem = objetosNaveReparados?.find((item) => item.objeto === 'bidon')
    const [showInfoPopup, setShowInfoPopup] = useState(false)
    const [showControlsPopup, setShowControlsPopup] = useState(false)
    const [start, setStart] = useState(false)
    const [optionStart, setOptionStart] = useState(true)
    const [isPlayingWorldSound, setIsPlayingWorldSound] = useState(false)
    const [showPosiciones, setShowPosiciones] = useState(false)
    const [showFormAppEvaluation, setFormAppEvaluation] = useState(false)
    const [showChatEmoji, setShowChatEmoji] = useState(false)

    const { playSound, pauseSound, stopSound } = useAudioPlayer()
    const { fps, warning } = useMonitorFPS(25)

    const gameFinished = motorItem && reactorItem && sistemaNavegacionItem && panelSolarItem && combustibleItem

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile()
                setProfile(profile)
            } catch (error: any) {
                console.error('Error al obtener el perfil del usuario:', error.message)
            }
        }

        fetchProfile()
    }, [])

    useEffect(() => {
        setReadings(readings)
    }, [readings, setReadings])

    useEffect(() => {
        setFormAppEvaluation(true)
    }, [gameFinished])

    useEffect(() => {
        document.body.classList.add('overflow-hidden')
        document.body.classList.add('touch-none')
        document.body.classList.add('select-none')
        const infoPopupStorage = localStorage.getItem('info_popup')

        if (!infoPopupStorage) {
            setShowInfoPopup(true)
        } else {
            setOptionStart(false)
        }

        const element = document.getElementById('app-menu')
        if (element) {
            element.remove()
        }

        setInGame(true)
    }, [])

    useEffect(() => {
        if (isPageVisible && !showMenu && isPlayingWorldSound) {
            playSound('anforaMusic')
        } else {
            stopSound('anforaMusic')
        }
    }, [isPageVisible])

    useEffect(() => {
        if (chatEmojis?.visualizado == false) {
            setShowChatEmoji(true)
        }
        setTimeout(() => {
            setShowChatEmoji(false)
        }, 5000)
    }, [chatEmojis])

    const handleSubmit = async (object: string, tiempoRespuesta: number) => {
        const data: Partial<ObjetoNaveReparado> = {
            planeta: 'anfora',
            tiempoRespuesta: tiempoRespuesta,
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

    const handleEvaluationSubmit = async (calificacion: string) => {
        const data: Partial<CalificacionPylos> = {
            calificacion: calificacion,
        }

        try {
            await saveCalificacionPylos(data)
        } catch (error) {
            console.error('Error al guardar la calificación:', error)
        }
    }

    return (
        <div className={`fondo-anfora  ${showMenu ? 'md:bg-[150px] lg:bg-[315px] 2xl:bg-[335px_-240px]' : ''}`}>
            <KeyboardControls map={keyboardMap}>
                <Canvas
                    shadows
                    camera={{ fov: 40, position: [20, 20, 20] }}
                    style={{ height: '100vh' }}
                    onMouseOver={() => setClickDisabled(false)}>
                    <Suspense fallback={null}>
                        <SoftShadows size={42} />
                        <AnforaExperience />
                    </Suspense>
                </Canvas>
                <LoadingScreen
                    started={start}
                    onStarted={setStart}
                />
                {process.env.NEXT_PUBLIC_DEBUG == 'true' && <Stats />}
            </KeyboardControls>

            {/* UI */}
            {!showMenu && showChatEmoji && (
                <div className="fixed z-30 left-0 right-0 top-52 w-64 mx-auto">
                    <h1 className=" text-white text-3xl text-center font-semibold">
                        ¡<span className="capitalize">{chatEmojis?.usuario1.nombre}</span> te ha enviado un emoji!
                    </h1>

                    <img
                        src={`/${
                            chatEmojis?.emoji == 'Guiño'
                                ? 'winking-face_1f609'
                                : chatEmojis?.emoji == 'Risa'
                                ? 'face-with-tears-of-joy_1f602'
                                : chatEmojis?.emoji == 'Llorar'
                                ? 'loudly-crying-face_1f62d'
                                : 'heart-suit_2665-fe0f'
                        }.png`}
                        className="mx-auto"
                    />
                </div>
            )}
            <div className="select-none">
                {warning && (
                    <div className="fixed bg-yellow-300/90 left-0 right-0 !bottom-32 p-2 rounded-full z-20 md:w-6/12 mx-4 md:mx-auto text-center text-yellow-900 text-xs flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 mr-2">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                            />
                        </svg>
                        Advertencia: Posiblemente su dispositivo no cumpla con los requisitos para ejecutar el juego ({fps.toFixed(2)}) fps
                    </div>
                )}

                <div className="fixed left-10 top-10">
                    <h1 className="text-2xl text-white font-black">
                        PYLOS | <span className="font-edu">ANFORA</span>
                    </h1>
                </div>

                {!showMenu && (
                    <div className="fixed right-10 top-10 flex">
                        {isPlayingWorldSound ? (
                            <button
                                className="text-white rounded-full border-4 border-white p-3 hidden md:inline-block"
                                type="button"
                                onClick={() => {
                                    setIsPlayingWorldSound(false), pauseSound('anforaMusic')
                                }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                                    />
                                </svg>
                            </button>
                        ) : (
                            <button
                                className="text-white rounded-full border-4 border-white p-3 hidden md:inline-block"
                                type="button"
                                onClick={() => {
                                    setIsPlayingWorldSound(true), playSound('anforaMusic')
                                }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                                    />
                                </svg>
                            </button>
                        )}

                        <button
                            className={`text-white rounded-full border-4 ${showPosiciones ? 'border-pylos-400' : 'border-white'} ml-2 p-3 hidden md:inline-block`}
                            type="button"
                            onClick={() => {
                                setShowPosiciones(!showPosiciones)
                            }}>
                            {showPosiciones ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className={`size-6 ${showPosiciones ? 'text-pylos-400' : ''}`}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                                    />
                                </svg>
                            )}
                        </button>

                        <button
                            className="text-white rounded-full border-4 border-white p-3 ml-2"
                            type="button"
                            onClick={() => {
                                setShowMenu(true), setActiveForm(false), pauseSound('anforaMusic')
                            }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                    </div>
                )}

                {showMenu && (
                    <div className="fixed inset-0 bg-white lg:w-[50vw] 2xl:w-[25vw] flex flex-col items-center justify-center px-12 md:px-8 lg:px-16">
                        <div className="flex">
                            <h1 className="text-2xl mt-2 text-black font-black">PYLOS</h1>

                            <img
                                src="/wissen-logo.png"
                                className="ml-4 w-44"
                            />
                        </div>

                        <p className="text-gray-700 leading-6 mt-12 mb-6 md:mb-20 font-medium font-edu text-sm md:text-[20px]">
                            PYLOS es un producto de Wissen Creativo, donde la educación se encuentra con la tecnología. En Wissen ofrecemos soluciones interactivas y gamificadas que transforman el
                            aprendizaje en una experiencia divertida y efectiva.
                        </p>

                        <div className="mb-6 flex md:hidden">
                            <button
                                type="button"
                                className="rounded-full border-2 border-black size-10 flex items-center justify-center mr-1"
                                onClick={() => {
                                    setShowMenu(false), setShowPosiciones(true)
                                }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-6 text-black">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                                    />
                                </svg>
                            </button>

                            <div
                                className="hover:opacity-60 transition-opacity"
                                onClick={() => {
                                    setShowInfoPopup(true), setShowMenu(false)
                                }}
                                onMouseOver={() => setClickDisabled(true)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-10 sm:size-12 text-black">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                                    />
                                </svg>
                            </div>

                            <div
                                className="hover:opacity-60 transition-opacity"
                                onClick={() => {
                                    setShowControlsPopup(true), setShowMenu(false)
                                }}
                                onMouseOver={() => setClickDisabled(true)}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    stroke="currentColor"
                                    className="size-10 sm:size-12 text-black">
                                    <path
                                        d="M6.00014 11H10.0001M8.00014 9V13M15.0001 12H15.0101M18.0001 10H18.0101M10.4491 5H13.5512C16.1761 5 17.4885 5 18.5187 5.49743C19.4257 5.9354 20.1793 6.63709 20.6808 7.51059C21.2503 8.5027 21.3438 9.81181 21.5309 12.43L21.7769 15.8745C21.8975 17.5634 20.5599 19 18.8667 19C18.0008 19 17.1796 18.6154 16.6253 17.9502L16.2501 17.5C15.907 17.0882 15.7354 16.8823 15.54 16.7159C15.1305 16.3672 14.6346 16.1349 14.1045 16.0436C13.8516 16 13.5836 16 13.0476 16H10.9527C10.4167 16 10.1487 16 9.89577 16.0436C9.36563 16.1349 8.86981 16.3672 8.46024 16.7159C8.26487 16.8823 8.09329 17.0882 7.75013 17.5L7.37497 17.9502C6.82064 18.6154 5.99949 19 5.13359 19C3.44037 19 2.10275 17.5634 2.22339 15.8745L2.46942 12.43C2.65644 9.81181 2.74994 8.5027 3.31951 7.51059C3.82098 6.63709 4.57458 5.9354 5.48159 5.49743C6.51176 5 7.8242 5 10.4491 5Z"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="space-y-2 visible md:invisible mb-10">
                            <div className="flex gap-2">
                                <div
                                    className={`font-black text-center rounded-xl shadow-inner shadow-gray-600/40 border-2 p-2 mx-auto size-10 flex items-center justify-center bg-white/80 ${
                                        motorItem ? 'text-pylos-600 border-pylos-600 opacity-100' : 'opacity-50 text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img src="/anfora/motor.png" />
                                </div>

                                <div
                                    className={`font-black text-center rounded-xl shadow-inner shadow-gray-600/40 border-2 p-2 mx-auto size-10 flex items-center justify-center bg-white/80 ${
                                        reactorItem ? 'text-pylos-600 border-pylos-600 opacity-100' : 'opacity-50 text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img src="/anfora/reactor.png" />
                                </div>

                                <div
                                    className={`font-black text-center rounded-xl shadow-inner shadow-gray-600/40 border-2 p-2 mx-auto size-10 flex items-center justify-center bg-white/80 ${
                                        sistemaNavegacionItem ? 'text-pylos-600 border-pylos-600 opacity-100' : 'opacity-50 text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img src="/anfora/navegacion.png" />
                                </div>

                                <div
                                    className={`font-black text-center rounded-xl shadow-inner shadow-gray-600/40 border-2 p-2 mx-auto size-10 flex items-center justify-center bg-white/80 ${
                                        panelSolarItem ? 'text-pylos-600 border-pylos-600 opacity-100' : 'opacity-50 text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img src="/anfora/panel.png" />
                                </div>

                                <div
                                    className={`font-black text-center rounded-xl shadow-inner shadow-gray-600/40 border-2 p-2 mx-auto size-10 flex items-center justify-center bg-white/80 ${
                                        combustibleItem ? 'text-pylos-600 border-pylos-600 opacity-100' : 'opacity-50 text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img
                                        src="/anfora/bidon.png"
                                        className="w-10"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            className="w-52 font-normal"
                            onMouseEnter={() => {
                                playSound('phoneShowed')
                            }}
                            onClick={() => {
                                setShowMenu(false), setIsPlayingWorldSound(true), playSound('anforaMusic')
                            }}>
                            {optionStart ? 'Empezar' : 'Continuar'}
                        </Button>

                        <Link
                            className="w-52 rounded-full bg-purple-800 text-center py-2 mt-4 hover:opacity-80 transition-opacity"
                            onMouseEnter={() => {
                                playSound('phoneShowed')
                            }}
                            href={MUNDOS_ROUTE}>
                            Salir
                        </Link>

                        <ul className="mt-20 flex items-center justify-center space-x-6 md:space-x-4">
                            <li>
                                <a
                                    href="https://instagram.com/wissen.creativo"
                                    target="_blank"
                                    className="hover:opacity-60 transition-opacity flex flex-col items-center justify-center">
                                    <svg
                                        fill="#000"
                                        strokeWidth="0"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 1024 1024"
                                        className="size-10">
                                        <path d="M512 306.9c-113.5 0-205.1 91.6-205.1 205.1S398.5 717.1 512 717.1 717.1 625.5 717.1 512 625.5 306.9 512 306.9zm0 338.4c-73.4 0-133.3-59.9-133.3-133.3S438.6 378.7 512 378.7 645.3 438.6 645.3 512 585.4 645.3 512 645.3zm213.5-394.6c-26.5 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9 47.9-21.3 47.9-47.9a47.84 47.84 0 0 0-47.9-47.9zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zm-88 235.8c-7.3 18.2-16.1 31.8-30.2 45.8-14.1 14.1-27.6 22.9-45.8 30.2C695.2 844.7 570.3 840 512 840c-58.3 0-183.3 4.7-235.9-16.1-18.2-7.3-31.8-16.1-45.8-30.2-14.1-14.1-22.9-27.6-30.2-45.8C179.3 695.2 184 570.3 184 512c0-58.3-4.7-183.3 16.1-235.9 7.3-18.2 16.1-31.8 30.2-45.8s27.6-22.9 45.8-30.2C328.7 179.3 453.7 184 512 184s183.3-4.7 235.9 16.1c18.2 7.3 31.8 16.1 45.8 30.2 14.1 14.1 22.9 27.6 30.2 45.8C844.7 328.7 840 453.7 840 512c0 58.3 4.7 183.2-16.2 235.8z"></path>
                                    </svg>

                                    <span className="md:ml-2 text-black mt-4 font-semibold text-wissen-gradient">@wissen.creativo</span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://wa.me/+573154707281"
                                    target="_blank"
                                    className="hover:opacity-60 transition-opacity flex flex-col items-center justify-center">
                                    <svg
                                        fill="#000"
                                        strokeWidth="0"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 1024 1024"
                                        className="size-10">
                                        <path d="M713.5 599.9c-10.9-5.6-65.2-32.2-75.3-35.8-10.1-3.8-17.5-5.6-24.8 5.6-7.4 11.1-28.4 35.8-35 43.3-6.4 7.4-12.9 8.3-23.8 2.8-64.8-32.4-107.3-57.8-150-131.1-11.3-19.5 11.3-18.1 32.4-60.2 3.6-7.4 1.8-13.7-1-19.3-2.8-5.6-24.8-59.8-34-81.9-8.9-21.5-18.1-18.5-24.8-18.9-6.4-.4-13.7-.4-21.1-.4-7.4 0-19.3 2.8-29.4 13.7-10.1 11.1-38.6 37.8-38.6 92s39.5 106.7 44.9 114.1c5.6 7.4 77.7 118.6 188.4 166.5 70 30.2 97.4 32.8 132.4 27.6 21.3-3.2 65.2-26.6 74.3-52.5 9.1-25.8 9.1-47.9 6.4-52.5-2.7-4.9-10.1-7.7-21-13z"></path>
                                        <path d="M925.2 338.4c-22.6-53.7-55-101.9-96.3-143.3-41.3-41.3-89.5-73.8-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9-53.3 22.8-101.1 55.2-142 96.5-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9.3 69.4 16.9 138.3 48 199.9v152c0 25.4 20.6 46 46 46h152.1c61.6 31.1 130.5 47.7 199.9 48h2.1c59.9 0 118-11.6 172.7-34.3 53.5-22.3 101.6-54.3 142.8-95.2 41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"></path>
                                    </svg>

                                    <span className="md:ml-2 text-black mt-4 font-semibold text-wissen-gradient">+57 315 4707281</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                )}

                {!activeForm && !showMenu && (
                    <>
                        <div
                            className="fixed bottom-32 left-2 sm:bottom-10 space-y-2 hover:opacity-60 transition-opacity"
                            onClick={() => setResetCharacterPosition(true)}>
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
                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                            </svg>
                        </div>

                        <div
                            className="fixed bottom-32 left-14 sm:left-16 sm:bottom-10 space-y-2 hover:opacity-60 transition-opacity hidden md:block"
                            onClick={() => setShowControlsPopup(true)}>
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

                        <div
                            className="fixed bottom-32 left-20 sm:left-[7.5rem] sm:bottom-10 space-y-2 hover:opacity-60 transition-opacity hidden md:block"
                            onClick={() => setShowInfoPopup(true)}>
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

                        <AlertDialog open={showInfoPopup}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle></AlertDialogTitle>
                                    <h1 className="text-center text-2xl font-semibold !mb-4">¡Ayuda a reparar la nave Nebulón!</h1>

                                    <div className="text-sm">
                                        Objetivo del juego: Encuentra las 5 partes perdidas de la nave Nebulón en el planeta Ánfora.
                                        <ol className="list-decimal mt-4 pl-4 text-left space-y-2">
                                            <li>
                                                <strong>Explora el planeta Ánfora:</strong> Busca las partes perdidas de la nave mientras exploras este increíble planeta.
                                            </li>
                                            <li>
                                                <strong>Haz clic en las partes:</strong> Cada vez que encuentres una parte de la nave, haz clic en ella.
                                            </li>
                                            <li>
                                                <strong>Responde la lectura:</strong> En tu dispositivo aparecerá una lectura que debes responder correctamente para reparar esa parte de la nave.
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

                                    <div className="flex items-center !mt-10">
                                        <div className="w-14 mx-16 p-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-10 sm:size-12 text-black">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                                />
                                            </svg>
                                        </div>

                                        <small className="block text-center ml-10">| Botón para restablecer posición</small>
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

                        <div className="fixed lg:right-10 left-0 right-0 mx-auto sm:w-[432px] bottom-6 space-y-2 invisible md:visible">
                            <div className="flex gap-2">
                                <div
                                    className={`font-black text-center rounded-xl shadow-inner shadow-gray-600/40 border-2 p-2 mx-auto size-20 flex items-center justify-center bg-white/80 ${
                                        motorItem ? 'text-pylos-600 border-pylos-600 opacity-100' : 'opacity-50 text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img src="/anfora/motor.png" />
                                </div>

                                <div
                                    className={`font-black text-center rounded-xl shadow-inner shadow-gray-600/40 border-2 p-2 mx-auto size-20 flex items-center justify-center bg-white/80 ${
                                        reactorItem ? 'text-pylos-600 border-pylos-600 opacity-100' : 'opacity-50 text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img src="/anfora/reactor.png" />
                                </div>

                                <div
                                    className={`font-black text-center rounded-xl shadow-inner shadow-gray-600/40 border-2 p-2 mx-auto size-20 flex items-center justify-center bg-white/80 ${
                                        sistemaNavegacionItem ? 'text-pylos-600 border-pylos-600 opacity-100' : 'opacity-50 text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img src="/anfora/navegacion.png" />
                                </div>

                                <div
                                    className={`font-black text-center rounded-xl shadow-inner shadow-gray-600/40 border-2 p-2 mx-auto size-20 flex items-center justify-center bg-white/80 ${
                                        panelSolarItem ? 'text-pylos-600 border-pylos-600 opacity-100' : 'opacity-50 text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img src="/anfora/panel.png" />
                                </div>

                                <div
                                    className={`font-black text-center rounded-xl shadow-inner shadow-gray-600/40 border-2 p-2 mx-auto size-20 flex items-center justify-center bg-white/80 ${
                                        combustibleItem ? 'text-pylos-600 border-pylos-600 opacity-100' : 'opacity-50 text-red-100 border-red-100 grayscale'
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
                                    setShowMap(!showMap), playSound('satelite')
                                }}
                                src="/satelite.png"
                                className={`${showMap ? 'grayscale' : ''} w-20 sm:w-32`}
                            />
                        </div>
                    </>
                )}
            </div>

            {!showMenu && gameFinished && !showChatEmoji && !showPosiciones && (
                <>
                    <div className="fixed top-32 mb-0 left-0 right-0 z-20 m-auto bg-white/20 backdrop-blur-md p-2 text-white text-3xl font-edu text-center">
                        <span className="block text-green-400 font-medium text-[80px] my-4 ">¡Genial!</span> La nave <span className="font-semibold">Nebulón</span> ha sido reparada por completo. ¡Gran
                        trabajo Pylonauta! 🚀✨
                    </div>

                    <AlertDialog open={showFormAppEvaluation}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle></AlertDialogTitle>
                                <h1 className="text-center text-2xl font-semibold !mb-4">¡Califica Pylos!</h1>

                                <form>
                                    <div>
                                        <Label className="my-4 text-center block">¿Cómo calificarías tu experiencia con Pylos? Por favor, selecciona la emoción que mejor te representa:</Label>
                                        <RadioGroup>
                                            <div className="flex items-center justify-center gap-4">
                                                <div className="flex flex-col-reverse items-center gap-2">
                                                    <RadioGroupItem
                                                        className="hover:opacity-80"
                                                        value="Super"
                                                        onClick={() => handleEvaluationSubmit('Super')}
                                                        id="Super"
                                                    />
                                                    <Label
                                                        htmlFor="Super"
                                                        className="hover:cursor-pointer hover:opacity-60">
                                                        <span className="bg-[url('/estados.png')] size-20 bg-[-34px_4px] bg-no-repeat inline-block bg-[length:155px]" />
                                                    </Label>
                                                </div>

                                                <div className="flex flex-col-reverse items-center gap-2">
                                                    <RadioGroupItem
                                                        className="hover:opacity-80"
                                                        value="Feliz"
                                                        onClick={() => handleEvaluationSubmit('Feliz')}
                                                        id="Feliz"
                                                    />
                                                    <Label
                                                        htmlFor="Feliz"
                                                        className="hover:cursor-pointer hover:opacity-60">
                                                        <span className="bg-[url('/estados.png')] size-20 bg-[-78px_-75px] bg-no-repeat inline-block bg-[length:155px]" />
                                                    </Label>
                                                </div>

                                                <div className="flex flex-col-reverse items-center gap-2">
                                                    <RadioGroupItem
                                                        className="hover:opacity-80"
                                                        value="Disgustado"
                                                        onClick={() => handleEvaluationSubmit('Disgustado')}
                                                        id="Disgustado"
                                                    />
                                                    <Label
                                                        htmlFor="Disgustado"
                                                        className="hover:cursor-pointer hover:opacity-60">
                                                        <span className="bg-[url('/estados.png')] size-20 bg-[0px_-75px] bg-no-repeat inline-block bg-[length:155px]" />
                                                    </Label>
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </form>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="mt-10">
                                <AlertDialogCancel
                                    className="text-white w-full"
                                    onClick={() => setFormAppEvaluation(false)}>
                                    Enviar
                                </AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )}

            <Ipad
                handleSubmit={handleSubmit}
                profile={profile}
            />

            {showPosiciones && !showMenu && (
                <>
                    <TablaPosiciones className="w-11/12 md:w-9/12 z-20 fixed inset-0 m-auto h-[70vh] overflow-y-auto bg-white rounded" />

                    <button
                        type="button"
                        className="fixed bottom-10 left-0 right-0 z-20 m-auto border py-2 px-6 rounded-full border-white md:hidden w-6/12"
                        onClick={() => {
                            setShowPosiciones(false)
                        }}>
                        Cerrar
                    </button>
                </>
            )}
        </div>
    )
}

export default Anfora
