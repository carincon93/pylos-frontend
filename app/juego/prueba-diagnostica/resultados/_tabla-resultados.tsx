'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateRespuestaPruebaDiagnostica } from '@/lib/actions'
import { RespuestaPruebaDiagnostica } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import useSWR, { mutate } from 'swr'

export default function TablaResultados() {
    const { data: respuestasPruebaDiagnostica } = useSWR<RespuestaPruebaDiagnostica[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/respuesta-prueba-diagnostica`, fetcher)

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
        <Table className="bg-white max-w-screen-xl mx-auto rounded shadow-lg text-black my-10">
            <TableCaption className="text-white">Lista de respuestas.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Estudiante</TableHead>
                    <TableHead>Pregunta</TableHead>
                    <TableHead>Respuesta</TableHead>
                    <TableHead className="text-center">Calificación</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {respuestasPruebaDiagnostica?.map((respuesta, index) => (
                    <TableRow key={respuesta.id}>
                        <TableCell className="font-medium">{respuesta.usuario.nombre}</TableCell>
                        <TableCell>
                            <small className="mb-2 inline-block">
                                {respuesta.preguntaPruebaDiagnostica.esPreguntaCerrada ? (
                                    <span className="bg-violet-200 text-violet-500 py-1 px-2 rounded-full mb-1 inline-block">Pregunta cerrada</span>
                                ) : (
                                    <span className="bg-sky-200 text-sky-500 py-1 px-2 rounded-full mb-1 inline-block">Pregunta abierta</span>
                                )}

                                <br />
                                <span className="text-xs text-gray-400">Código: {respuesta.id}</span>
                            </small>
                            <br />
                            {respuesta.preguntaPruebaDiagnostica.pregunta}
                        </TableCell>
                        <TableCell>
                            {respuesta.respuesta && respuesta.opcionPruebaDiagnostica?.opcion ? (
                                <span className="text-yellow-600 bg-yellow-100/70 p-2 rounded border border-yellow-400 block leading-4">
                                    <small>Warn: Se ha guardado una respuesta abierta en una pregunta cerrada.</small>
                                    <br />
                                    <br />
                                    {respuesta.respuesta}
                                </span>
                            ) : (
                                <>{respuesta.respuesta}</>
                            )}
                            <br />

                            {respuesta.opcionPruebaDiagnostica?.opcion}
                        </TableCell>
                        <TableCell className="text-center">
                            {respuesta.preguntaPruebaDiagnostica.esPreguntaCerrada ? (
                                <small className={`${respuesta.opcionPruebaDiagnostica.esOpcionCorrecta ? 'bg-green-200 text-green-500' : 'bg-red-200 text-red-500'} py-1 px-2 rounded-full`}>
                                    {respuesta.opcionPruebaDiagnostica.esOpcionCorrecta ? 'Correcto' : 'Incorrecto'}
                                </small>
                            ) : (
                                <Select
                                    name="grado"
                                    onValueChange={(value) => handleChange(value, respuesta.id)}
                                    value={respuesta.esRespuestaCorrecta === null ? '' : respuesta.esRespuestaCorrecta ? '1' : '0'}
                                    required>
                                    <SelectTrigger className="uppercase">
                                        <SelectValue placeholder="Calificar" />
                                    </SelectTrigger>
                                    <SelectContent className="uppercase rounded">
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
