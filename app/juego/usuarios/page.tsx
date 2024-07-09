import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Isotipo } from '@/app/components/Isotipo'
import { Logo } from '@/app/components/Logo'
import TablaPosiciones from './_tabla-posiciones'
import TablaResultados from './_tabla-resultados'
import { Metadata } from 'next'
import BackgroundStars from '@/app/components/BackgroundStars'

interface Props {
    searchParams: {
        admin?: boolean | undefined
    }
}

export const metadata: Metadata = {
    title: 'Usuarios y tabla de posiciones',
}

const UsuariosPage = ({ searchParams }: Props) => {
    const isAdmin = searchParams.admin

    return (
        <>
            <BackgroundStars />

            <div className="top-0 left-0 w-full bg-cover bg-center z-20 flex flex-col items-center justify-center">
                <div className="flex justify-center gap-x-4 relative top-0">
                    <Isotipo className="w-14 dark:drop-shadow-[255_255_255.3rem_#ffffff70]" />
                    <Logo className="w-52 dark:drop-shadow-[255_255_255.3rem_#ffffff70] text-white" />
                </div>

                <h1 className="text-4xl text-center font-medium">Usuarios y tabla de posiciones</h1>

                <Tabs
                    defaultValue="posiciones"
                    className="mt-10 z-20 w-full md:max-w-screen-xl">
                    {isAdmin && (
                        <TabsList>
                            <TabsTrigger value="posiciones">Tabla de posiciones</TabsTrigger>
                            <TabsTrigger value="respuestas">Respuestas</TabsTrigger>
                        </TabsList>
                    )}
                    <TabsContent value="posiciones">
                        <TablaPosiciones isAdmin={isAdmin} />
                    </TabsContent>
                    <TabsContent value="respuestas">
                        <TablaResultados />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default UsuariosPage
