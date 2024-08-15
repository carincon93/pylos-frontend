'use client'

import { fetcher } from '@/utils/fetcher'
import useSWR, { mutate } from 'swr'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import LoadingOverlay from '@/app/loading'
import { Button } from '@/components/ui/button'
import { deleteUsuario, getProfile, restartRespuestaPruebaDiagnostica, saveChatEmoji, updateChatEmoji } from '@/lib/actions'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { ChatEmojis, Usuario } from '@/types/MyTypes'
import { useEffect, useState } from 'react'
import UsuarioForm from './_form'

export default function TablaPosiciones({ className }: { className?: string }) {
    const [open, setOpen] = useState(false)
    const [usuario, setUsuario] = useState<Partial<Usuario>>()
    const [profile, setProfile] = useState<Usuario>()
    const [emojiStatus, setEmojiStatus] = useState(false)
    const { data: resultadosPruebaDiagnostica } = useSWR<[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/respuesta-prueba-diagnostica/obtener/tabla-de-posiciones`, fetcher)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile()
                setProfile(profile)
            } catch (error: any) {
                console.error('Error al obtener el perfil del usuario:', error.message)
            }
        }

        fetchProfile()
    }, [])

    if (!resultadosPruebaDiagnostica) {
        return <LoadingOverlay />
    }

    const handleRestartPrueba = async (usuarioId: string | undefined) => {
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

        setOpen(false)
    }

    const handleDeleteUsuario = async () => {
        try {
            await deleteUsuario(usuario?.usuarioId)
        } catch (error) {
            console.error('Error al eliminar el usuario:', error)
        } finally {
            mutate(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/respuesta-prueba-diagnostica/obtener/tabla-de-posiciones`)
        }

        setOpen(false)
    }

    const handleChatEmoji = async (emoji: string, usuario2Id: string) => {
        setEmojiStatus(true)
        const data: Partial<ChatEmojis> = {
            usuario2Id: usuario2Id,
            emoji: emoji,
        }

        try {
            const emoji = await saveChatEmoji(data)

            if (emoji) {
                setTimeout(async () => {
                    const newData: Partial<ChatEmojis> = {
                        id: emoji?.id,
                        visualizado: true,
                    }
                    await updateChatEmoji(newData)

                    setEmojiStatus(false)
                }, 5000)
            }
        } catch (error) {
            console.error('Error al guardar el emoji:', error)
        }
    }

    return (
        <>
            <AlertDialog open={open}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            <div>
                                Nombre del estudiante: <span className="capitalize font-light">{usuario?.nombre}</span>
                            </div>
                            <div>
                                Colegio: <span className="capitalize font-light">{usuario?.colegio}</span>
                            </div>
                            <div>
                                Grado: <span className="capitalize font-light">{usuario?.grado}</span>
                            </div>

                            <div className="mt-5">
                                <small>Datos de inicio de sesión</small>
                            </div>
                            <div>
                                Pylonauta: <span className="capitalize font-light">{usuario?.nombreUsuario}</span>
                            </div>
                            <div>
                                Mascota: <span className="capitalize font-light">{usuario?.mascotaNombre}</span>
                            </div>
                        </AlertDialogTitle>
                        <UsuarioForm
                            className="!mt-10"
                            usuario={usuario}
                            setDialogStatus={setOpen}
                        />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <div className="flex flex-col w-full !space-y-4">
                            <AlertDialogAction
                                className=""
                                type="submit"
                                form="editar-usuario">
                                Guardar y cerrar
                            </AlertDialogAction>

                            <AlertDialogAction onClick={() => handleRestartPrueba(usuario?.usuarioId)}>
                                <span className="hidden md:inline-block">Restablecer prueba</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-4 md:hidden mx-auto">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                    />
                                </svg>
                            </AlertDialogAction>

                            <AlertDialogAction
                                className="bg-red-500"
                                onClick={() => handleDeleteUsuario()}>
                                Eliminar usuario
                            </AlertDialogAction>

                            <AlertDialogCancel
                                className="text-white"
                                onClick={() => setOpen(false)}>
                                Cerrar
                            </AlertDialogCancel>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className={`${className}`}>
                <Table className={` bg-white rounded shadow-lg text-black my-10 table-fixed`}>
                    <TableCaption className="text-white">Tabla de posiciones.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[20px] md:w-[80px] text-center">
                                <span className="hidden md:block">Posición</span>
                            </TableHead>
                            <TableHead>Estudiante</TableHead>
                            <TableHead>Puntaje</TableHead>
                            <TableHead>Tiempo</TableHead>
                            {profile?.esAdmin && <TableHead>Acciones</TableHead>}
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
                                                resultado.puntaje >= 8 ? 'bg-[-22px_-1px]' : resultado.puntaje < 8 && resultado.puntaje >= 6 ? 'bg-[-43px_-42px]' : 'bg-[-4px_-42px]'
                                            }  bg-[length:86px] md:ml-6`}></span>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-center md:text-left">
                                    {resultado.tiempoPruebaDiagnostica ? `${resultado.tiempoPruebaDiagnostica} segundos` : 'No ha iniciado la prueba'}{' '}
                                </TableCell>

                                <TableCell className="space-y-2">
                                    {profile?.esAdmin ? (
                                        <Button
                                            onClick={() => {
                                                setUsuario(resultado), setOpen(true)
                                            }}
                                            className="block w-full text-xs">
                                            <span className="hidden md:inline-block">Editar</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-4  md:hidden mx-auto">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                />
                                            </svg>
                                        </Button>
                                    ) : (
                                        <>
                                            <div className="flex justify-between">
                                                <button
                                                    className="hover:bg-pylos-300 size-10 rounded-full"
                                                    onClick={() => handleChatEmoji('Guiño', resultado?.usuarioId)}>
                                                    😉
                                                </button>
                                                <button
                                                    className="hover:bg-pylos-300 size-10 rounded-full"
                                                    onClick={() => handleChatEmoji('Risa', resultado?.usuarioId)}>
                                                    😂
                                                </button>
                                                <button
                                                    className="hover:bg-pylos-300 size-10 rounded-full"
                                                    onClick={() => handleChatEmoji('Llorar', resultado?.usuarioId)}>
                                                    😭
                                                </button>
                                                <button
                                                    className="hover:bg-pylos-300 size-10 rounded-full"
                                                    onClick={() => handleChatEmoji('Corazon', resultado?.usuarioId)}>
                                                    ❤️
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {emojiStatus && (
                    <h1 className="fixed inset-0 m-auto h-12 bg-pylos-300/60 backdrop-blur-sm text-center py-2 px-2 rounded-full text-2xl w-52 font-semibold z-30 text-pylos-900">¡Emoji enviado!</h1>
                )}
            </div>
        </>
    )
}
