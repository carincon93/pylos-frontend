'use client'

import React from 'react'

import { RespuestaPruebaDiagnostica } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import useSWR, { mutate } from 'swr'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Stars } from '@/app/components/Stars'
import { Canvas } from '@react-three/fiber'
import { updateRespuestaPruebaDiagnostica } from '@/lib/actions'
import { Isotipo } from '@/app/components/Isotipo'
import { Logo } from '@/app/components/Logo'

interface Props {
    searchParams: {
        admin?: string | undefined
    }
}

const ResultadosPruebaDiagnosticaPage = ({ searchParams }: Props) => {
    const isAdmin = searchParams.admin

    const { data: resultadosPruebaDiagnostica } = useSWR<[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/respuesta-prueba-diagnostica/obtener/tabla-de-posiciones`, fetcher)
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
        <>
            <Canvas
                camera={{ position: [0, 0, 1] }}
                className="!h-[100vh] !fixed z-10 bg-pylos-800/50">
                <Stars />
            </Canvas>

            <div className="top-0 left-0 w-full bg-cover bg-center z-20 flex flex-col items-center justify-center">
                <div className="flex justify-center gap-x-4 relative top-12 lg:top-0">
                    <Isotipo className="w-14 dark:drop-shadow-[255_255_255.3rem_#ffffff70]" />
                    <Logo className="w-52 dark:drop-shadow-[255_255_255.3rem_#ffffff70] text-white" />
                </div>

                <h1 className="text-4xl text-center font-medium">Tabla de posiciones</h1>

                <Tabs
                    defaultValue="posiciones"
                    className="mt-10 z-30">
                    {isAdmin == '1' && (
                        <TabsList>
                            <TabsTrigger value="posiciones">Tabla de posiciones</TabsTrigger>
                            <TabsTrigger value="respuestas">Respuestas</TabsTrigger>
                        </TabsList>
                    )}
                    <TabsContent value="posiciones">
                        <Table className="bg-white max-w-screen-xl mx-auto rounded shadow-lg text-black my-10 table-fixed">
                            <TableCaption className="text-white">Tabla de posiciones.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px] text-center">Posición</TableHead>
                                    <TableHead>Estudiante</TableHead>
                                    <TableHead>Puntaje</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {resultadosPruebaDiagnostica?.map((resultado: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium text-center">{index + 1}</TableCell>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center">
                                                <Avatar className="size-10 mr-4">
                                                    <AvatarImage src={`${process.env.NEXT_PUBLIC_NESTJS_ASSETS}/${resultado.mascotaFoto}`} />
                                                    <AvatarFallback>MASCOTA</AvatarFallback>
                                                </Avatar>
                                                {resultado.nombre}
                                            </div>
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
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="respuestas">
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
                                                <small
                                                    className={`${
                                                        respuesta.opcionPruebaDiagnostica.esOpcionCorrecta ? 'bg-green-200 text-green-500' : 'bg-red-200 text-red-500'
                                                    } py-1 px-2 rounded-full`}>
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
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default ResultadosPruebaDiagnosticaPage
