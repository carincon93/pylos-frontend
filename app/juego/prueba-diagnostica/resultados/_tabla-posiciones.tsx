'use client'

import { fetcher } from '@/utils/fetcher'
import useSWR, { mutate } from 'swr'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import LoadingOverlay from '@/app/loading'
import { Button } from '@/components/ui/button'
import { restartRespuestaPruebaDiagnostica } from '@/lib/actions'
import { Usuario } from '@/types/MyTypes'
import { useState } from 'react'
import Link from 'next/link'
import { INTRODUCCION_ROUTE } from '@/utils/routes'

export default function TablaPosiciones({ isAdmin }: { isAdmin: boolean | undefined }) {
    const { data: resultadosPruebaDiagnostica } = useSWR<[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/respuesta-prueba-diagnostica/obtener/tabla-de-posiciones`, fetcher)
    const [open, setOpen] = useState(false)

    if (!resultadosPruebaDiagnostica) {
        return <LoadingOverlay />
    }

    const handleRestartPrueba = async (usuarioId: string) => {
        const data: Partial<Usuario> = {
            id: usuarioId,
        }

        try {
            await restartRespuestaPruebaDiagnostica(data)
        } catch (error) {
            console.error('Error al guardar la respuesta:', error)
        } finally {
            mutate(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/respuesta-prueba-diagnostica/obtener/tabla-de-posiciones`)
        }
    }

    return (
        <>
            <AlertDialog open={open}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Empieza la aventura de nuestro pequeño Pylonauta:</AlertDialogTitle>
                        <AlertDialogDescription>
                            1. A continuación, verás fotos que cuentan la historia de Pylonauta.
                            <br />
                            <br />
                            <img src="/introduccion-dialog.webp" />
                            <br />
                            2. En cada foto, una voz explicará el viaje de nuestro Pylonauta.
                            <br />
                            <br />
                            3. Cuando la voz termine de hablar, haz clic en <strong>Siguiente foto</strong> para continuar con la historia.
                            <br />
                            <br />
                            <strong>¡Estás muy cerca de comenzar esta gran aventura!</strong>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>
                            <Link href={INTRODUCCION_ROUTE}>Continuar</Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Button
                className="fixed bottom-4 right-4 z-30 bg-secondary hover:bg-secondary/90 rounded-full shadow-lg py-4 pl-8 pr-6 flex items-center justify-center"
                onClick={() => setOpen(true)}>
                Continuar
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="ml-2 w-6 h-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                </svg>
            </Button>

            <Table className="bg-white rounded shadow-lg text-black my-10 table-fixed">
                <TableCaption className="text-white">Tabla de posiciones.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[20px] md:w-[80px] text-center">
                            <span className="hidden md:block">Posición</span>
                        </TableHead>
                        <TableHead>Estudiante</TableHead>
                        <TableHead>Puntaje</TableHead>
                        <TableHead>Tiempo</TableHead>
                        {isAdmin && <TableHead>Acciones</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {resultadosPruebaDiagnostica?.map((resultado: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium text-center">{index + 1}</TableCell>
                            <TableCell className="font-medium">
                                <div className="flex items-center text-xs md:text-md lg:text-lg capitalize flex-col justify-center md:justify-start md:flex-row text-center md:text-left">
                                    <Avatar className="size-10 md:mr-4 mb-2 md:mb-0">
                                        <AvatarImage src={`${process.env.NEXT_PUBLIC_NESTJS_ASSETS}/${resultado.mascotaFoto}`} />
                                        <AvatarFallback>MASCOTA</AvatarFallback>
                                    </Avatar>
                                    {resultado.nombre}
                                </div>
                            </TableCell>
                            <TableCell className="font-medium">
                                <div className={`flex items-center bg-pylos-400 text-white rounded-full p-2 justify-center flex-col md:flex-row`}>
                                    {resultado.puntaje}

                                    <span
                                        className={`bg-[url('/estados.png')] size-10 inline-block bg-no-repeat ${
                                            resultado.puntaje >= 8 ? 'bg-[-77px_-2px]' : resultado.puntaje < 8 && resultado.puntaje >= 6 ? 'bg-[1px_-45px]' : 'bg-[-38px_-45px]'
                                        }  bg-[length:123px] md:ml-6`}></span>
                                </div>
                            </TableCell>
                            <TableCell className="font-medium text-center md:text-left">
                                {resultado.tiempoPruebaDiagnostica ? `${resultado.tiempoPruebaDiagnostica} segundos` : 'No ha iniciado la prueba'}{' '}
                            </TableCell>

                            {isAdmin && (
                                <TableCell>
                                    <Button
                                        className="text-xs mt-1 bg-red-400 hover:bg-red-500 ml-2 md:ml-0"
                                        onClick={() => handleRestartPrueba(resultado.usuarioId)}>
                                        <span className="hidden md:inline-block">Restablecer prueba</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-4 h-4 md:hidden">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                            />
                                        </svg>
                                    </Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
