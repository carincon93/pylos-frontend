'use client'

import { AnforaExperience } from '@/app/components/game/anfora/AnforaExperience'
import AnforaForm from '@/app/components/game/anfora/Form'
import { saveObjetoNaveReparado } from '@/lib/actions'
import { useGameStore } from '@/lib/store'
import { KeyboardControls, Loader, SoftShadows } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { fetcher } from '@/utils/fetcher'
import useSWR, { mutate } from 'swr'
import { ObjetoNaveReparado } from '@/types/MyTypes'

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
    const [qtyCorrectOptions, setQtyCorrectOptions] = useState<number>(0)
    const activeForm = useGameStore((state) => state.activeForm)
    const setActiveForm = useGameStore((state) => state.setActiveForm)
    const setReadings = useGameStore((state) => state.setReadings)
    const setSelectedFormOption = useGameStore((state) => state.setSelectedFormOption)

    const motorItem = objetosNaveReparados?.find((item) => item.objeto === 'motor')

    useEffect(() => {
        setReadings(readings)
    }, [readings, setReadings])

    const handleSubmit = async (qtyQuestions: number, answer: any) => {
        setSelectedFormOption(true)

        setTimeout(() => {
            setSelectedFormOption(false)
        }, 5000)

        if (answer.esOpcionCorrecta) {
            setQtyCorrectOptions((prev) => prev + 1)
        }

        if (answer.esOpcionCorrecta && qtyQuestions - 1 == qtyCorrectOptions) {
            const data: Partial<ObjetoNaveReparado> = {
                planeta: 'anfora',
                objeto: 'motor',
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
                    camera={{ fov: 70 }}
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
                        Motor {motorItem ? '' : 'pérdido'}
                    </div>
                    <div className="text-red-100 font-black text-center border-2 rounded-xl p-2 border-red-100 mx-auto w-20 h-20 flex items-center justify-center">Ítem 2 pérdido</div>
                    <div className="text-red-100 font-black text-center border-2 rounded-xl p-2 border-red-100 mx-auto w-20 h-20 flex items-center justify-center">Ítem 3 pérdido</div>
                    <div className="text-red-100 font-black text-center border-2 rounded-xl p-2 border-red-100 mx-auto w-20 h-20 flex items-center justify-center">Ítem 4 pérdido</div>
                    <div className="text-red-100 font-black text-center border-2 rounded-xl p-2 border-red-100 mx-auto w-20 h-20 flex items-center justify-center">Ítem 5 pérdido</div>
                </div>
            </div>
            {activeForm && <AnforaForm handleSubmit={handleSubmit} />}
        </>
    )
}

export default Anfora
