import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { INTRODUCCION_ROUTE } from '@/utils/routes'

import { Isotipo } from '@/app/components/Isotipo'
import { Logo } from '@/app/components/Logo'
import TablaPosiciones from './_tabla-posiciones'
import TablaResultados from './_tabla-resultados'
import Link from 'next/link'
import { Metadata } from 'next'
import BackgroundStars from '@/app/components/BackgroundStars'

interface Props {
    searchParams: {
        admin?: string | undefined
    }
}

export const metadata: Metadata = {
    title: 'Resultados - Prueba diagnóstica',
}

const ResultadosPruebaDiagnosticaPage = ({ searchParams }: Props) => {
    const isAdmin = searchParams.admin

    return (
        <>
            <BackgroundStars />

            <Link
                href={INTRODUCCION_ROUTE}
                className="fixed bottom-4 right-4 z-30 bg-secondary hover:bg-secondary/90 rounded-full shadow-lg py-4 pl-8 pr-6 flex items-center justify-center">
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
            </Link>

            <div className="top-0 left-0 w-full bg-cover bg-center z-20 flex flex-col items-center justify-center">
                <div className="flex justify-center gap-x-4 relative top-12 lg:top-0">
                    <Isotipo className="w-14 dark:drop-shadow-[255_255_255.3rem_#ffffff70]" />
                    <Logo className="w-52 dark:drop-shadow-[255_255_255.3rem_#ffffff70] text-white" />
                </div>

                <h1 className="text-4xl text-center font-medium">Tabla de posiciones</h1>

                <Tabs
                    defaultValue="posiciones"
                    className="mt-10 z-20">
                    {isAdmin == '1' && (
                        <TabsList>
                            <TabsTrigger value="posiciones">Tabla de posiciones</TabsTrigger>
                            <TabsTrigger value="respuestas">Respuestas</TabsTrigger>
                        </TabsList>
                    )}
                    <TabsContent value="posiciones">
                        <TablaPosiciones />
                    </TabsContent>
                    <TabsContent value="respuestas">
                        <TablaResultados />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default ResultadosPruebaDiagnosticaPage
