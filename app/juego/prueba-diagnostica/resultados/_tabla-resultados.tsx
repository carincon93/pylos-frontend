'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateRespuestaPruebaDiagnostica } from '@/lib/actions'
import { RespuestaPruebaDiagnostica } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import useSWR, { mutate } from 'swr'
import LoadingOverlay from '@/app/loading'

export default function TablaResultados() {
    const { data: respuestasPruebaDiagnostica } = useSWR<RespuestaPruebaDiagnostica[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/respuesta-prueba-diagnostica`, fetcher)

    if (!respuestasPruebaDiagnostica) {
        return <LoadingOverlay />
    }

    const handleChange = async (value: string, respuestaId: string) => {
        // Convertir el valor de cadena a booleano
        const esRespuestaCorrecta = value === '1' ? true : false

        const data: Partial<RespuestaPruebaDiagnostica> = {
            id: respuestaId,
            esRespuestaCorrecta: esRespuestaCorrecta,
        }

        try {
            await updateRespuestaPruebaDiagnostica(data)
        } catch (error) {
            console.error('Error al guardar la respuesta:', error)
        } finally {
            mutate(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/respuesta-prueba-diagnostica`)
        }
    }

    return (
        <Table className="bg-white rounded shadow-lg text-black my-10">
            <TableCaption className="text-white">Lista de respuestas.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px] hidden md:table-cell">Estudiante</TableHead>
                    <TableHead className="hidden md:table-cell">Pregunta</TableHead>
                    <TableHead className="hidden md:table-cell">Respuesta</TableHead>
                    <TableHead className="text-center hidden md:table-cell">Calificación</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {respuestasPruebaDiagnostica?.map((respuesta, index) => (
                    <TableRow
                        key={respuesta.id}
                        className="flex flex-col md:table-row">
                        <TableCell>
                            <span className="text-gray-400 block mb-4 md:hidden">Estudiante:</span>

                            <span className="text-md font-medium capitalize">{respuesta.usuario.nombre}</span>
                        </TableCell>
                        <TableCell>
                            <small className="mb-6 inline-block text-xs">
                                {respuesta.preguntaPruebaDiagnostica.esPreguntaCerrada ? (
                                    <span className="bg-violet-200 text-violet-500 py-1 px-2 rounded-full md:mb-2 inline-block text-[10px] md:text-xs">Pregunta cerrada</span>
                                ) : (
                                    <span className="bg-sky-200 text-sky-500 py-1 px-2 rounded-full md:mb-2 inline-block text-[10px] md:text-xs">Pregunta abierta</span>
                                )}

                                <br />
                                <span className="text-xs text-gray-400 hidden md:inline-block">Código: {respuesta.id}</span>
                            </small>
                            <br />
                            {respuesta.preguntaPruebaDiagnostica.pregunta}
                        </TableCell>
                        <TableCell>
                            <span className="text-gray-400 block mb-4 md:hidden">Respuesta:</span>

                            {respuesta.respuesta && respuesta.opcionPruebaDiagnostica?.opcion ? (
                                <span className="text-yellow-600 bg-yellow-100/70 p-2 rounded border border-yellow-400 block leading-4">
                                    <small>Warn: Se ha guardado una respuesta abierta en una pregunta cerrada.</small>
                                    <br />
                                    <br />
                                    <p className="first-letter:uppercase">{respuesta.respuesta}</p>
                                </span>
                            ) : (
                                <p className="first-letter:uppercase">{respuesta.respuesta}</p>
                            )}

                            {respuesta.opcionPruebaDiagnostica?.opcion}
                        </TableCell>
                        <TableCell className="text-left md:text-center pb-14 md:pb-0">
                            <span className="text-gray-400 block mb-4 md:hidden">Calificación:</span>
                            {respuesta.preguntaPruebaDiagnostica.esPreguntaCerrada ? (
                                <span
                                    className={`${
                                        respuesta.opcionPruebaDiagnostica.esOpcionCorrecta ? 'bg-green-200 text-green-500 border-green-400 px-7' : 'bg-red-200 text-red-400 border-red-400 px-6'
                                    } py-2 rounded-full border w-full block text-center`}>
                                    {respuesta.opcionPruebaDiagnostica.esOpcionCorrecta ? 'Correcto' : 'Incorrecto'}
                                </span>
                            ) : (
                                <Select
                                    name="grado"
                                    onValueChange={(value) => handleChange(value, respuesta.id)}
                                    value={respuesta.esRespuestaCorrecta === null ? '' : respuesta.esRespuestaCorrecta ? '1' : '0'}
                                    required>
                                    <SelectTrigger
                                        className={`${
                                            respuesta.esRespuestaCorrecta === null
                                                ? ''
                                                : respuesta.esRespuestaCorrecta
                                                ? 'bg-green-200 border-green-400 text-green-500'
                                                : 'bg-red-200 border-red-400 text-red-400'
                                        }`}>
                                        <SelectValue placeholder="Calificar" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded">
                                        <SelectItem value="1">Correcto</SelectItem>
                                        <SelectItem value="0">Incorrecto</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
