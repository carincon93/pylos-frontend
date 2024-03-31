'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { saveRespuestaPruebaDiagnostica } from '@/lib/actions'
import { PreguntaPruebaDiagnostica, RespuestaPruebaDiagnostica } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import useSWR, { mutate } from 'swr'
import debounce from 'lodash/debounce'
import { Progress } from '@/components/ui/progress'

const PruebaDiagnosticaPage: React.FC = () => {
    const { data: preguntasPruebaDiagnostica } = useSWR<PreguntaPruebaDiagnostica[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/pregunta-prueba-diagnostica/preguntas/usuario`, fetcher)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = debounce(async (opcionPruebaDiagnosticaId: string) => {
        if (isSubmitting) return

        setIsSubmitting(true)

        const data: Partial<RespuestaPruebaDiagnostica> = {
            opcionPruebaDiagnosticaId: opcionPruebaDiagnosticaId,
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
        <div className="h-[100vh]">
            <Progress value={33} />

            <Carousel className="w-[90%] mx-auto h-full flex items-center justify-center">
                <CarouselContent>
                    {preguntasPruebaDiagnostica?.map((preguntasPruebaDiagnostica, i) => (
                        <CarouselItem key={preguntasPruebaDiagnostica.id}>
                            <p className="text-center text-4xl">{preguntasPruebaDiagnostica.pregunta}</p>

                            <div className="grid grid-cols-3 gap-4 mt-20">
                                {preguntasPruebaDiagnostica?.opcionPruebaDiagnostica?.map((opcionPruebaDiagnostica, j) => (
                                    <Button
                                        key={opcionPruebaDiagnostica.id}
                                        className="p-10 text-[20px]"
                                        onClick={() => handleSubmit(opcionPruebaDiagnostica.id)}
                                        disabled={isSubmitting}>
                                        {opcionPruebaDiagnostica.opcion}
                                    </Button>
                                ))}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious />
                <CarouselNext /> */}
            </Carousel>
        </div>
    )
}

export default PruebaDiagnosticaPage
