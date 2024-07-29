import { Isotipo } from '@/components/Isotipo'
import { Logo } from '@/components/Logo'
import { Metadata } from 'next'
import EmpezarAventuraCarousel from './_carousel'

export const metadata: Metadata = {
    title: 'Empezar la aventura',
}

export default function EmpezarAventuraPage() {
    return (
        <div className="min-h-screen fondo z-[1] md:flex items-center justify-center">
            <div>
                <div className="flex justify-center gap-x-4">
                    <Isotipo className="w-14 dark:drop-shadow-[255_255_255.3rem_#ffffff70]" />
                    <Logo className="w-52 dark:drop-shadow-[255_255_255.3rem_#ffffff70] text-white" />
                </div>
                <h1 className="text-[20px] text-center">Seleccione un planeta:</h1>
            </div>

            <EmpezarAventuraCarousel />
        </div>
    )
}
