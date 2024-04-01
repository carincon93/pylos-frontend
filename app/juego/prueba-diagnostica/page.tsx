'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { saveRespuestaPruebaDiagnostica } from '@/lib/actions'
import { PreguntaPruebaDiagnostica, RespuestaPruebaDiagnostica } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import useSWR, { mutate } from 'swr'
import debounce from 'lodash/debounce'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { INTRODUCCION_ROUTE } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import { Loading } from '@/components/ui/loading'

const PruebaDiagnosticaPage: React.FC = () => {
    const { data: preguntasPruebaDiagnostica } = useSWR<PreguntaPruebaDiagnostica[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/pregunta-prueba-diagnostica`, fetcher)
    const { data: preguntasPruebaDiagnosticaPorUsuario } = useSWR<PreguntaPruebaDiagnostica[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/pregunta-prueba-diagnostica/preguntas/usuario`, fetcher)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [respuesta, setRespuesta] = useState('')
    const [progress, setProgress] = useState(0)

    const router = useRouter()

    useEffect(() => {
        if (preguntasPruebaDiagnostica && preguntasPruebaDiagnosticaPorUsuario) {
            setProgress(((preguntasPruebaDiagnostica?.length - preguntasPruebaDiagnosticaPorUsuario?.length) * 100) / preguntasPruebaDiagnostica?.length)
        }
    }, [preguntasPruebaDiagnostica && preguntasPruebaDiagnosticaPorUsuario])

    useEffect(() => {
        setTimeout(() => {
            if (progress == 100) router.push(INTRODUCCION_ROUTE)
        }, 1000)
    }, [progress])

    const handleSubmit = debounce(async (preguntaPruebaDiagnosticaId?: string | null, opcionPruebaDiagnosticaId?: string | null) => {
        if (isSubmitting) return

        setIsSubmitting(true)

        const data: Partial<RespuestaPruebaDiagnostica> = {
            preguntaPruebaDiagnosticaId: preguntaPruebaDiagnosticaId,
            opcionPruebaDiagnosticaId: opcionPruebaDiagnosticaId,
            respuesta: respuesta,
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
        }
    }, 1000) // Cambia el valor del retardo según tus necesidades

    return (
        <div className="h-[100vh] relative overflow-hidden bg-[url('/fondo-prueba.webp')] bg-cover bg-center fondo-prueba">
            {progress == 100 && (
                <div className="absolute bg-sky-400 w-full h-[100vh] z-[99] text-white flex items-center justify-center text-4xl font-medium">
                    <Loading />
                </div>
            )}

            {progress > 0 && progress < 100 && (
                <Progress
                    className="absolute max-w-md lg:max-w-7xl left-0 right-0 mx-auto top-8 h-6"
                    value={progress}
                />
            )}

            <Carousel className="w-[90%] mx-auto h-full flex items-center justify-center">
                <CarouselContent>
                    {preguntasPruebaDiagnosticaPorUsuario?.map((preguntaPruebaDiagnostica, i) => (
                        <CarouselItem
                            key={preguntaPruebaDiagnostica.id}
                            className="px-10">
                            <p className="text-center text-4xl">{preguntaPruebaDiagnostica.pregunta}</p>

                            <div className="grid grid-cols-3 gap-4 mt-20">
                                {preguntaPruebaDiagnostica.esPreguntaCerrada ? (
                                    <>
                                        {preguntaPruebaDiagnostica?.opcionPruebaDiagnostica?.map((opcionPruebaDiagnostica, j) => (
                                            <Button
                                                key={opcionPruebaDiagnostica.id}
                                                className="p-10 text-[20px]"
                                                onClick={() => handleSubmit(preguntaPruebaDiagnostica.id, opcionPruebaDiagnostica.id)}
                                                disabled={isSubmitting}>
                                                {opcionPruebaDiagnostica.opcion}
                                            </Button>
                                        ))}
                                    </>
                                ) : (
                                    <div className="col-span-3 flex flex-col gap-y-8 items-center justify-center">
                                        <Input
                                            className=" h-16 border-primary border-2 uppercase text-2xl text-center"
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
    )
}

export default PruebaDiagnosticaPage
