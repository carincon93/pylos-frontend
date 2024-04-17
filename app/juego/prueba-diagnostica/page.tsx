'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { reproducirParte, saveRespuestaPruebaDiagnostica } from '@/lib/actions'
import { PreguntaPruebaDiagnostica, RespuestaPruebaDiagnostica } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import useSWR, { mutate } from 'swr'
import debounce from 'lodash/debounce'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { RESULTADOS_PRUEBA_DIAGNOSTICA_ROUTE } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import { Loading } from '@/components/ui/loading'
import { Stars } from '@/app/components/Stars'
import { Canvas } from '@react-three/fiber'

const PruebaDiagnosticaPage: React.FC = () => {
    const { data: preguntasPruebaDiagnosticaPorUsuario } = useSWR<PreguntaPruebaDiagnostica[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/pregunta-prueba-diagnostica/preguntas/usuario`, fetcher)

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [respuesta, setRespuesta] = useState('')
    const [progress, setProgress] = useState(0)
    const [opcionCorrecta, setOpcionCorrecta] = useState<any>()

    const router = useRouter()

    const buttonPressed = '/button-pressed.mp3'

    useEffect(() => {
        if (preguntasPruebaDiagnosticaPorUsuario) {
            setProgress(((10 - preguntasPruebaDiagnosticaPorUsuario?.length) * 100) / 10)
            setTimeout(() => {
                if (preguntasPruebaDiagnosticaPorUsuario.length === 0) router.push(RESULTADOS_PRUEBA_DIAGNOSTICA_ROUTE)
            }, 1000)
        }
    }, [preguntasPruebaDiagnosticaPorUsuario])

    if (progress == 100) {
        return (
            <div className="absolute bg-pylos-800 w-full h-[100vh] z-[99] text-white flex items-center justify-center text-4xl font-medium">
                <Loading />
            </div>
        )
    }

    const handleSubmit = debounce(async (preguntaPruebaDiagnosticaId?: string | null, opcionPruebaDiagnosticaId?: string | null, esOpcionCorrecta?: boolean | null) => {
        if (isSubmitting) return

        setOpcionCorrecta(esOpcionCorrecta)

        reproducirParte(0, 2, buttonPressed)

        setIsSubmitting(true)

        const data: Partial<RespuestaPruebaDiagnostica> = {
            preguntaPruebaDiagnosticaId: preguntaPruebaDiagnosticaId,
            opcionPruebaDiagnosticaId: opcionPruebaDiagnosticaId,
            respuesta: opcionPruebaDiagnosticaId ? undefined : respuesta,
        }

        try {
            await saveRespuestaPruebaDiagnostica(data)
        } catch (error) {
            console.error('Error al guardar la respuesta:', error)
        } finally {
            setTimeout(() => {
                setIsSubmitting(false)
            }, 1000)
            mutate(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/pregunta-prueba-diagnostica/preguntas/usuario`)

            setOpcionCorrecta(undefined)
        }
    }, 1000)

    return (
        <>
            <Canvas
                camera={{ position: [0, 0, 1] }}
                className="!h-[100vh] !fixed z-10 bg-pylos-800/50">
                <Stars />
            </Canvas>

            <div className="h-[100vh] relative w-full overflow-hidden bg-cover bg-center z-20">
                {progress > 0 && progress < 100 && (
                    <div className="flex items-center justify-center mt-10">
                        <Progress
                            className=" w-9/12 lg:max-w-7xl h-6 mr-4"
                            value={progress}
                        />
                        <span className="text-2xl font-bold font-cursive">{progress}%</span>
                    </div>
                )}

                {opcionCorrecta != undefined && (
                    <span
                        className={`bg-[url('/estados.png')] size-24 ${
                            opcionCorrecta ? 'bg-[-205px_-9px]' : 'bg-[1px_-21px]'
                        }  bg-[length:314px] absolute inline-block bg-no-repeat animate__animated animate__bounceIn mx-auto left-0 right-0 top-40`}></span>
                )}

                <Carousel className="w-[90%] mx-auto h-full flex items-center justify-center">
                    <CarouselContent>
                        {preguntasPruebaDiagnosticaPorUsuario?.map((preguntaPruebaDiagnostica, i) => (
                            <CarouselItem
                                key={preguntaPruebaDiagnostica.id}
                                className="px-10">
                                <p className="text-center text-2xl sm:text-4xl">{preguntaPruebaDiagnostica.pregunta}</p>

                                <div className="grid sm:grid-cols-3 gap-4 mt-20">
                                    {preguntaPruebaDiagnostica.esPreguntaCerrada ? (
                                        <>
                                            {preguntaPruebaDiagnostica?.opcionPruebaDiagnostica?.map((opcionPruebaDiagnostica, j) => (
                                                <Button
                                                    key={opcionPruebaDiagnostica.id}
                                                    className="p-8 sm:p-10 text-[20px] text-wrap leading-5"
                                                    onClick={() => handleSubmit(preguntaPruebaDiagnostica.id, opcionPruebaDiagnostica.id, opcionPruebaDiagnostica.esOpcionCorrecta)}
                                                    disabled={isSubmitting}>
                                                    {opcionPruebaDiagnostica.opcion}
                                                </Button>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="col-span-3 flex flex-col gap-y-8 items-center justify-center">
                                            <Input
                                                className="sm:w-9/12 h-14 border-primary border-2 uppercase text-[18px] text-center mx-auto"
                                                placeholder="Escriba la respuesta"
                                                onChange={(event) => setRespuesta(event.target.value)}
                                            />
                                            <Button
                                                className="uppercase text-[18px] h-12 w-52"
                                                onClick={() => handleSubmit(preguntaPruebaDiagnostica.id, null)}
                                                disabled={respuesta == ''}>
                                                Siguiente
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </>
    )
}

export default PruebaDiagnosticaPage
