'use client'

import { AnforaExperience } from '@/app/components/game/anfora/AnforaExperience'
import AnforaForm from '@/app/components/game/anfora/Form'
import { saveObjetoNaveReparado } from '@/lib/actions'
import { ObjetoNaveReparado } from '@/types/MyTypes'
import { useGameStore } from '@/lib/store'
import { KeyboardControls, Loader, SoftShadows, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { fetcher } from '@/utils/fetcher'
import useSWR, { mutate } from 'swr'

const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
    { name: 'reset', keys: ['KeyR'] },
    { name: 'run', keys: ['Space'] },
]

function Anfora() {
    const { data: readings } = useSWR<any>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/lectura/anfora`, fetcher)
    const { data: objetosNaveReparados } = useSWR<ObjetoNaveReparado[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/objeto-nave-reparado/obtener/por-usuario`, fetcher)
    const activeForm = useGameStore((state) => state.activeForm)
    const setActiveForm = useGameStore((state) => state.setActiveForm)
    const setReadings = useGameStore((state) => state.setReadings)
    const setInGame = useGameStore((state) => state.setInGame)
    const setShowMap = useGameStore((state) => state.setShowMap)
    const showMap = useGameStore((state) => state.showMap)

    const motorItem = objetosNaveReparados?.find((item) => item.objeto === 'motor')
    const alaItem = objetosNaveReparados?.find((item) => item.objeto === 'ala')
    const sistemaNavegacionItem = objetosNaveReparados?.find((item) => item.objeto === 'sistema de navegación')
    const panelSolarItem = objetosNaveReparados?.find((item) => item.objeto === 'panel solar')
    const combustibleItem = objetosNaveReparados?.find((item) => item.objeto === 'combustible')
    const [showTablet, setShowTablet] = useState(false)

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
        const element = document.getElementById('app-menu')
        if (element) {
            element.remove()
        }

        setInGame(true)
    }, [])

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
                    style={{ height: '100vh' }}>
                    <color
                        attach="background"
                        args={['#9104a4']}
                    />
                    <Suspense>
                        <SoftShadows size={42} />
                        <AnforaExperience />
                    </Suspense>
                </Canvas>
                <Stats />
            </KeyboardControls>

            {/* UI */}
            <div className="select-none">
                <div className="fixed left-10 top-10">
                    <h1 className="text-2xl text-white font-black">PYLOS | ÁNFORA</h1>
                </div>

                {!activeForm && (
                    <>
                        <div className="fixed left-10 bottom-6 space-y-2 hidden xl:block">
                            <div>
                                <div className="text-2xl text-red-100 font-black text-center border-2 rounded-xl p-2 border-red-100 mx-auto w-14">W</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="text-2xl text-red-100 font-black text-center border-2 rounded-xl p-2 border-red-100 mx-auto w-14">A</div>
                                <div className="text-2xl text-red-100 font-black text-center border-2 rounded-xl p-2 border-red-100 mx-auto w-14">S</div>
                                <div className="text-2xl text-red-100 font-black text-center border-2 rounded-xl p-2 border-red-100 mx-auto w-14">D</div>
                            </div>
                            <small className="block text-center">Caminar</small>
                        </div>

                        <div className="fixed left-60 bottom-6 space-y-2 hidden xl:block">
                            <div>
                                <div className="text-2xl text-red-100 font-black text-center border-2 rounded-xl p-2 border-red-100 mx-auto w-40">Espacio</div>
                            </div>

                            <small className="block text-center">Correr</small>
                        </div>

                        <div className="fixed left-[410px] bottom-6 space-y-2 hidden xl:block">
                            <div>
                                <div className="text-2xl text-red-100 font-black text-center border-2 rounded-xl p-2 border-red-100 mx-auto w-14">R</div>
                            </div>

                            <small className="block text-center">Restablecer</small>
                        </div>

                        <div className="fixed lg:right-10 left-0 right-0 mx-auto w-[432px] bottom-6 space-y-2">
                            <div className="flex gap-2">
                                <div
                                    className={`font-black text-center border-2 p-2 mx-auto w-20 h-20 flex items-center justify-center bg-white/80 ${
                                        motorItem ? 'text-pylos-600 border-pylos-600' : 'text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img src="/anfora/motor.png" />
                                </div>

                                <div
                                    className={`font-black text-center border-2 p-2 mx-auto w-20 h-20 flex items-center justify-center bg-white/80 ${
                                        alaItem ? 'text-pylos-600 border-pylos-600' : 'text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img
                                        src="/anfora/ala.png"
                                        className="relative bottom-0 right-[-22px] block w-8"
                                    />
                                </div>

                                <div
                                    className={`font-black text-center border-2 p-2 mx-auto w-20 h-20 flex items-center justify-center bg-white/80 ${
                                        sistemaNavegacionItem ? 'text-pylos-600 border-pylos-600' : 'text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img src="/anfora/navegacion.png" />
                                </div>

                                <div
                                    className={`font-black text-center border-2 p-2 mx-auto w-20 h-20 flex items-center justify-center bg-white/80 ${
                                        panelSolarItem ? 'text-pylos-600 border-pylos-600' : 'text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img
                                        src="/anfora/panel.png"
                                        className="relative -bottom-4 -right-2 block"
                                    />
                                </div>

                                <div
                                    className={`font-black text-center border-2 p-2 mx-auto w-20 h-20 flex items-center justify-center bg-white/80 ${
                                        combustibleItem ? 'text-pylos-600 border-pylos-600' : 'text-red-100 border-red-100 grayscale'
                                    }`}>
                                    <img
                                        src="/anfora/bidon.png"
                                        className="w-10"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="fixed bottom-4 right-10 hover:opacity-80 transition-opacity select-none">
                            <img
                                onClick={() => setShowMap(!showMap)}
                                src="/satelite.png"
                                className="w-32"
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
