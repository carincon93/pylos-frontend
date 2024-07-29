'use client'

import { RESULTADOS_ROUTE } from '@/utils/routes'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { saveRespuestaPruebaDiagnostica, updateUsuario } from '@/lib/actions'
import { PreguntaPruebaDiagnostica, RespuestaPruebaDiagnostica, Usuario } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { useContextData } from '@/app/context/AppContext'
import LoadingOverlay from '@/app/loading'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import debounce from 'lodash/debounce'
import useSWR, { mutate } from 'swr'

export default function Prueba() {
    const { data: preguntasPruebaDiagnosticaPorUsuario } = useSWR<PreguntaPruebaDiagnostica[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/pregunta-prueba-diagnostica/preguntas/usuario`, fetcher)

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [respuesta, setRespuesta] = useState('')
    const [progress, setProgress] = useState(0)
    const [opcionCorrecta, setOpcionCorrecta] = useState<any>()
    const [cronometro, setCronometro] = useState(0)
    const [tiempoEnMinutos, setTiempoEnMinutos] = useState('')
    const [open, setOpen] = useState(false)

    const { profileUserData } = useContextData()

    const router = useRouter()
    const { playSound } = useAudioPlayer()

    useEffect(() => {
        if (preguntasPruebaDiagnosticaPorUsuario) {
            setProgress(((20 - preguntasPruebaDiagnosticaPorUsuario?.length) * 100) / 20)
            sendTiempoPruebaDiagnostica()

            if (preguntasPruebaDiagnosticaPorUsuario.length === 0) {
                router.push(RESULTADOS_ROUTE)
            }
        }
    }, [preguntasPruebaDiagnosticaPorUsuario])

    useEffect(() => {
        if (!open) {
            const start = Date.now()

            // Actualiza el tiempo del cronómetro cada segundo
            const intervalo = setInterval(() => {
                const tiempoTranscurrido = Date.now() - start
                const segundosTranscurridos = Math.floor(tiempoTranscurrido / 1000)
                const minutos = Math.floor(segundosTranscurridos / 60)
                const segundos = segundosTranscurridos % 60
                const tiempoFormateado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`
                setTiempoEnMinutos(tiempoFormateado)
                setCronometro(segundosTranscurridos)
            }, 1000)

            return () => {
                clearInterval(intervalo)
            }
        }
    }, [open])

    useEffect(() => {
        setOpen(true)
    }, [])

    const sendTiempoPruebaDiagnostica = async () => {
        const data: Partial<Usuario> = {
            tiempoPruebaDiagnostica: cronometro + (profileUserData ? profileUserData?.tiempoPruebaDiagnostica : 0),
        }

        try {
            if (cronometro > 0) {
                await updateUsuario(data)
            }
        } catch (error) {
            console.error('Error al guardar la información:', error)
        }
    }

    if (progress == 100) {
        return <LoadingOverlay className="bg-pylos-900" />
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
        <>
            <AlertDialog
                open={open}
                onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            <span className="block text-center mb-4 text-2xl">
                                ¡Hola <span className="capitalize">{profileUserData?.nombre}</span> 👋🏻!
                            </span>{' '}
                            Estamos a punto de embarcarnos en una emocionante aventura de aprendizaje. Sigue estos pasos para comenzar:
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            1. Prepárate para responder preguntas emocionantes. Recuerda, no te preocupes si tienes respuestas incorrectas, ¡solo queremos ver cuánto sabes!
                            <br />
                            <br />
                            2. ¡Inicia el Desafío! La prueba consta de 20 preguntas. ¡Habrá un cronómetro para registrar cuánto tiempo te tomas en total, no hay límite de tiempo! Responde con calma y
                            sin prisa.
                            <br />
                            <br />
                            3. ¡Aprender y Divertirse! ¡Y listo! Ahora es tu momento de brillar. Responde con confianza y disfruta aprendiendo.
                            <br />
                            <br />
                            <strong>Recuerda, esta aventura es para divertirse y aprender juntos. ¡Que empiece la diversión!</strong>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>Continuar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="relative w-full min-h-[100vh] bg-cover bg-center z-20">
                {!open && (
                    <>
                        {progress < 100 && (
                            <>
                                <div className="flex items-center justify-center pt-10">
                                    <Progress
                                        className=" w-9/12 lg:max-w-7xl h-6 mr-4"
                                        value={progress}
                                    />
                                    <span className="text-2xl font-bold font-cursive">{progress}%</span>
                                </div>
                                <div className="flex items-center justify-center flex-col mt-1">
                                    <div className="flex items-center justify-center">
                                        <svg
                                            className="mr-2"
                                            height="16"
                                            strokeLinejoin="round"
                                            viewBox="0 0 16 16"
                                            width="16">
                                            <path
                                                d="M7.25 1.25V2.03971C5.87928 2.18571 4.62678 2.72736 3.6089 3.54824L3.03033 2.96967L2.5 2.43934L1.43934 3.5L1.96967 4.03033L2.54824 4.6089C1.57979 5.80976 1 7.33717 1 9C1 12.866 4.13401 16 8 16C11.866 16 15 12.866 15 9C15 7.33717 14.4202 5.80976 13.4518 4.6089L14.0303 4.03033L14.5607 3.5L13.5 2.43934L12.9697 2.96967L12.3911 3.54824C11.3732 2.72736 10.1207 2.18571 8.75 2.03971V1.25H9.25H10V-0.25H9.25H8.75H7.25H6.75H6V1.25H6.75H7.25ZM2.5 9C2.5 5.96243 4.96243 3.5 8 3.5C11.0376 3.5 13.5 5.96243 13.5 9C13.5 12.0376 11.0376 14.5 8 14.5C4.96243 14.5 2.5 12.0376 2.5 9ZM8.75 6.75V6H7.25V6.75V9V9.75H8.75V9V6.75Z"
                                                fill="currentColor"></path>
                                        </svg>

                                        {tiempoEnMinutos}
                                    </div>
                                </div>
                            </>
                        )}

                        {opcionCorrecta != undefined && (
                            <span
                                className={`bg-[url('/estados.png')] size-32 ${
                                    opcionCorrecta ? 'bg-[-55px_3px]' : 'bg-[-2px_-125px]'
                                } absolute inline-block bg-no-repeat animate__animated animate__bounceIn mx-auto left-0 right-0 top-[40%] z-30`}></span>
                        )}

                        <Carousel className="w-[90%] mt-20 mx-auto h-full flex items-center justify-center">
                            <CarouselContent>
                                {isSubmitting ? (
                                    <></>
                                ) : (
                                    preguntasPruebaDiagnosticaPorUsuario?.map((preguntaPruebaDiagnostica, i) => (
                                        <CarouselItem
                                            key={preguntaPruebaDiagnostica.id}
                                            className="px-10 ">
                                            <p className="text-center text-2xl sm:text-4xl">{preguntaPruebaDiagnostica.pregunta}</p>

                                            <div className={`grid sm:grid-cols-${preguntaPruebaDiagnostica?.opcionPruebaDiagnostica.length} gap-4 mt-20`}>
                                                {preguntaPruebaDiagnostica.esPreguntaCerrada ? (
                                                    <>
                                                        {preguntaPruebaDiagnostica?.opcionPruebaDiagnostica?.map((opcionPruebaDiagnostica, j) => (
                                                            <Button
                                                                key={opcionPruebaDiagnostica.id}
                                                                className="p-8 sm:p-10 text-[20px] text-wrap leading-5"
                                                                onClick={() => {
                                                                    playSound('buttonPressed'),
                                                                        handleSubmit(preguntaPruebaDiagnostica.id, opcionPruebaDiagnostica.id, opcionPruebaDiagnostica.esOpcionCorrecta)
                                                                }}
                                                                disabled={isSubmitting}>
                                                                {opcionPruebaDiagnostica.opcion}
                                                            </Button>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <div className="col-span-3 flex flex-col gap-y-8 items-center justify-center">
                                                        <Input
                                                            className="sm:w-9/12 h-14 border-primary border-2 text-[18px] text-center mx-auto"
                                                            placeholder="Escriba la respuesta"
                                                            onChange={(event) => setRespuesta(event.target.value)}
                                                        />
                                                        <Button
                                                            className="text-[18px] h-12 w-52"
                                                            onClick={() => {
                                                                playSound('buttonPressed'), handleSubmit(preguntaPruebaDiagnostica.id, null)
                                                            }}
                                                            disabled={respuesta == ''}>
                                                            Siguiente
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </CarouselItem>
                                    ))
                                )}
                            </CarouselContent>
                        </Carousel>
                    </>
                )}
            </div>
        </>
    )
}
