'use client'

import { AnforaExperience } from '@/app/components/game/anfora/AnforaExperience'
import AnforaForm from '@/app/components/game/anfora/Form'
import { saveObjetoNaveReparado } from '@/lib/actions'
import { ObjetoNaveReparado } from '@/types/MyTypes'
import { useGameStore } from '@/lib/store'
import { KeyboardControls, Loader, SoftShadows } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { fetcher } from '@/utils/fetcher'
import useSWR, { mutate } from 'swr'

const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
    { name: 'run', keys: ['Space'] },
]

function Anfora() {
    const { data: readings } = useSWR<any>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/lectura/anfora`, fetcher)
    const { data: objetosNaveReparados } = useSWR<ObjetoNaveReparado[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/objeto-nave-reparado/obtener/por-usuario`, fetcher)
    const activeForm = useGameStore((state) => state.activeForm)
    const setActiveForm = useGameStore((state) => state.setActiveForm)
    const setReadings = useGameStore((state) => state.setReadings)
    const setSelectedFormOption = useGameStore((state) => state.setSelectedFormOption)
    const qtyCorrectOptions = useGameStore((state) => state.qtyCorrectOptions)
    const setQtyCorrectOptions = useGameStore((state) => state.setQtyCorrectOptions)

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

    const handleSubmit = async (qtyQuestions: number, answer: any, object: string) => {
        setSelectedFormOption(true)

        setTimeout(() => {
            setSelectedFormOption(false)
        }, 5000)

        if (answer.esOpcionCorrecta) {
            setQtyCorrectOptions(qtyCorrectOptions + 1)
        }

        if (qtyCorrectOptions >= qtyQuestions - 1 && answer.esOpcionCorrecta) {
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
    }

    return (
        <>
            <KeyboardControls map={keyboardMap}>
                <Canvas
                    shadows
                    camera={{ fov: 40 }}
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
            </KeyboardControls>

            <div className="select-none">
                <div className="fixed left-10 top-10">
                    <h1 className="text-2xl text-white font-black">PYLOS | ÁNFORA</h1>
                </div>

                <div className="fixed left-10 bottom-6 space-y-2">
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

                <div className="fixed left-60 bottom-6 space-y-2">
                    <div>
                        <div className="text-2xl text-red-100 font-black text-center border-2 rounded-xl p-2 border-red-100 mx-auto w-40">Espacio</div>
                    </div>

                    <small className="block text-center">Correr</small>
                </div>

                <div className="fixed right-10 bottom-6 space-y-2">
                    <div className="flex gap-2">
                        <div
                            className={`font-black text-center border-2 rounded-xl p-2 mx-auto w-20 h-20 flex items-center justify-center ${
                                motorItem ? 'text-pylos-600 border-pylos-600' : 'text-red-100 border-red-100'
                            }`}>
                            Motor
                        </div>

                        <div
                            className={`font-black text-center border-2 rounded-xl p-2 mx-auto w-20 h-20 flex items-center justify-center ${
                                alaItem ? 'text-pylos-600 border-pylos-600' : 'text-red-100 border-red-100'
                            }`}>
                            Ala
                        </div>

                        <div
                            className={`font-black text-center border-2 rounded-xl p-2 mx-auto w-20 h-20 flex items-center justify-center ${
                                sistemaNavegacionItem ? 'text-pylos-600 border-pylos-600' : 'text-red-100 border-red-100'
                            }`}>
                            Sistema de navegación
                        </div>

                        <div
                            className={`font-black text-center border-2 rounded-xl p-2 mx-auto w-20 h-20 flex items-center justify-center ${
                                panelSolarItem ? 'text-pylos-600 border-pylos-600' : 'text-red-100 border-red-100'
                            }`}>
                            Panel solar
                        </div>

                        <div
                            className={`font-black text-center border-2 rounded-xl p-2 mx-auto w-20 h-20 flex items-center justify-center ${
                                combustibleItem ? 'text-pylos-600 border-pylos-600' : 'text-red-100 border-red-100'
                            }`}>
                            Combustible
                        </div>
                    </div>
                </div>
            </div>

            <AnforaForm handleSubmit={handleSubmit} />
        </>
    )
}

export default Anfora
