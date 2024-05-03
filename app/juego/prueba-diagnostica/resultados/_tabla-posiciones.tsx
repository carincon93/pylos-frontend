'use client'

import { fetcher } from '@/utils/fetcher'
import useSWR, { mutate } from 'swr'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import LoadingOverlay from '@/app/loading'
import { Button } from '@/components/ui/button'
import { restartRespuestaPruebaDiagnostica } from '@/lib/actions'
import { Usuario } from '@/types/MyTypes'

export default function TablaPosiciones({ isAdmin }: { isAdmin: boolean | undefined }) {
    const { data: resultadosPruebaDiagnostica } = useSWR<[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/respuesta-prueba-diagnostica/obtener/tabla-de-posiciones`, fetcher)

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
        <Table className="bg-white rounded shadow-lg text-black my-10 table-fixed">
            <TableCaption className="text-white">Tabla de posiciones.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-center">Posición</TableHead>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Puntaje</TableHead>
                    <TableHead>Tiempo</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {resultadosPruebaDiagnostica?.map((resultado: any, index: number) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium text-center">{index + 1}</TableCell>
                        <TableCell className="font-medium">
                            <div className="flex items-center text-xs md:text-md lg:text-lg">
                                <Avatar className="size-10 mr-4">
                                    <AvatarImage src={`${process.env.NEXT_PUBLIC_NESTJS_ASSETS}/${resultado.mascotaFoto}`} />
                                    <AvatarFallback>MASCOTA</AvatarFallback>
                                </Avatar>
                                {resultado.nombre}
                            </div>

                            {isAdmin && (
                                <Button
                                    className="text-xs mt-1 bg-red-400 hover:bg-red-500"
                                    onClick={() => handleRestartPrueba(resultado.usuarioId)}>
                                    Restablecer prueba
                                </Button>
                            )}
                        </TableCell>
                        <TableCell className="font-medium">
                            <div className={`flex items-center bg-pylos-400 text-white rounded-full p-2 justify-center`}>
                                {resultado.puntaje}

                                <span
                                    className={`bg-[url('/estados.png')] size-10 inline-block bg-no-repeat ${
                                        resultado.puntaje >= 8 ? 'bg-[-77px_-2px]' : resultado.puntaje < 8 && resultado.puntaje >= 6 ? 'bg-[1px_-45px]' : 'bg-[-38px_-45px]'
                                    }  bg-[length:123px] ml-6`}></span>
                            </div>
                        </TableCell>
                        <TableCell className="font-medium">{resultado.tiempoPruebaDiagnostica} segundos</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
