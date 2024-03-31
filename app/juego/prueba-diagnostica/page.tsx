'use client'

import { Button } from '@/components/ui/button'
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { saveRespuestaPruebaDiagnostica } from '@/lib/actions'
import { PreguntaPruebaDiagnostica, RespuestaPruebaDiagnostica } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

const PruebaDiagnosticaPage: React.FC = () => {
    const [api, setApi] = useState<CarouselApi>()
    const { data: preguntasPruebaDiagnostica } = useSWR<PreguntaPruebaDiagnostica[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/pregunta-prueba-diagnostica`, fetcher)

    useEffect(() => {
        if (!api) {
            return
        }

        api.on('select', () => {
            api.console.log('test')

            // Do something on select.
        })
    }, [api])

    const handleSubmit = async (opcionPruebaDiagnosticaId: string) => {
        const data: Partial<RespuestaPruebaDiagnostica> = {
            opcionPruebaDiagnosticaId: opcionPruebaDiagnosticaId,
        }

        try {
            await saveRespuestaPruebaDiagnostica(data)
        } catch (error) {
            console.error('Error al guardar el curso complementario:', error)
        }
    }

    return (
        <div className="h-[100vh]">
            <Carousel
                className="w-[90%] mx-auto h-full flex items-center justify-center"
                setApi={setApi}>
                <CarouselContent>
                    {preguntasPruebaDiagnostica?.map((preguntasPruebaDiagnostica, i) => (
                        <CarouselItem key={preguntasPruebaDiagnostica.id}>
                            <p className="text-center text-4xl">{preguntasPruebaDiagnostica.pregunta}</p>

                            <div className="grid grid-cols-3 gap-4 mt-20">
                                {preguntasPruebaDiagnostica?.opcionPruebaDiagnostica?.map((opcionPruebaDiagnostica, j) => (
                                    <Button
                                        key={opcionPruebaDiagnostica.id}
                                        className="p-10 text-[20px]"
                                        onClick={() => handleSubmit(opcionPruebaDiagnostica.id)}>
                                        {opcionPruebaDiagnostica.opcion}
                                    </Button>
                                ))}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious /> */}
                <CarouselNext disabled />
            </Carousel>
        </div>
    )
}

export default PruebaDiagnosticaPage
