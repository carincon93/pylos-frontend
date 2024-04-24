'use client'

import { RESULTADOS_PRUEBA_DIAGNOSTICA_ROUTE } from '@/utils/routes'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import LoadingOverlay from '@/app/loading'
import { saveRespuestaPruebaDiagnostica } from '@/lib/actions'
import { PreguntaPruebaDiagnostica, RespuestaPruebaDiagnostica } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import useSWR, { mutate } from 'swr'
import debounce from 'lodash/debounce'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'

export default function Prueba() {
    const { playAudio } = useAudioPlayer()

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
        return <LoadingOverlay className="bg-pylos-800" />
    }

    const handleSubmit = debounce(async (preguntaPruebaDiagnosticaId?: string | null, opcionPruebaDiagnosticaId?: string | null, esOpcionCorrecta?: boolean | null) => {
        if (isSubmitting) return

        setOpcionCorrecta(esOpcionCorrecta)

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
                setOpcionCorrecta(undefined)
                setIsSubmitting(false)
            }, 1000)
            mutate(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/pregunta-prueba-diagnostica/preguntas/usuario`)
        }
    }, 500)

    return (
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
                    }  bg-[length:314px] absolute inline-block bg-no-repeat animate__animated animate__bounceIn mx-auto left-0 right-0 top-32 z-30`}></span>
            )}

            <Carousel className="w-[90%] mx-auto h-full flex items-center justify-center -mt-20">
                <CarouselContent>
                    {preguntasPruebaDiagnosticaPorUsuario?.map((preguntaPruebaDiagnostica, i) => (
                        <CarouselItem
                            key={preguntaPruebaDiagnostica.id}
                            className="px-10 ">
                            <p className="text-center text-2xl sm:text-4xl">{preguntaPruebaDiagnostica.pregunta}</p>

                            <div className="grid sm:grid-cols-3 gap-4 mt-20">
                                {preguntaPruebaDiagnostica.esPreguntaCerrada ? (
                                    <>
                                        {preguntaPruebaDiagnostica?.opcionPruebaDiagnostica?.map((opcionPruebaDiagnostica, j) => (
                                            <Button
                                                key={opcionPruebaDiagnostica.id}
                                                className="p-8 sm:p-10 text-[20px] text-wrap leading-5"
                                                onClick={() => {
                                                    playAudio(0, 2, buttonPressed), handleSubmit(preguntaPruebaDiagnostica.id, opcionPruebaDiagnostica.id, opcionPruebaDiagnostica.esOpcionCorrecta)
                                                }}
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
                                            onClick={() => {
                                                playAudio(0, 2, buttonPressed), handleSubmit(preguntaPruebaDiagnostica.id, null)
                                            }}
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
