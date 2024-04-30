import Link from 'next/link'
import { ANFORA_ROUTE } from '@/utils/routes'
import { Isotipo } from '@/app/components/Isotipo'
import { Logo } from '@/app/components/Logo'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
    title: 'Empezar la aventura',
}

export default function EmpezarAventuraPage() {
    return (
        <div className="min-h-screen fondo z-[1]">
            <div className="lg:w-8/12 xl:w-7/12 2xl:w-6/12 lg:mx-auto text-left lg:mt-0">
                <div className="flex justify-center gap-x-4">
                    <Isotipo className="w-14 dark:drop-shadow-[255_255_255.3rem_#ffffff70]" />
                    <Logo className="w-52 dark:drop-shadow-[255_255_255.3rem_#ffffff70] text-white" />
                </div>
                <h1 className="text-2xl my-6 text-center">Seleccione un planeta:</h1>

                <div className="lg:grid grid-cols-2">
                    <Link
                        href={ANFORA_ROUTE}
                        className="flex items-center hover:opacity-60">
                        <Image
                            src="/anfora.webp"
                            alt="Planeta Ánfora"
                            width={240}
                            height={40}
                            className="object-contain"
                        />
                        <h1 className="text-2xl">ÁNFORA</h1>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center hover:opacity-60 grayscale">
                        <Image
                            src="/planeta2.webp"
                            alt="planetaVerde"
                            width={240}
                            height={40}
                            className="object-contain"
                        />
                        <h1 className="text-2xl">POR DEFINIR</h1>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center hover:opacity-60 grayscale">
                        <Image
                            src="/planeta3.webp"
                            alt="PlanetMorado"
                            width={240}
                            height={40}
                            className="object-contain"
                        />
                        <h1 className="text-2xl">POR DEFINIR</h1>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center hover:opacity-60 grayscale relative md:-left-4 2xl:-left-3">
                        <Image
                            src="/planeta4.webp"
                            alt="planetaRosa"
                            width={240}
                            height={40}
                            className="object-contain"
                        />
                        <h1 className="text-2xl">POR DEFINIR</h1>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center hover:opacity-60 grayscale">
                        <Image
                            src="/planeta5.webp"
                            alt="planetaAzul"
                            width={240}
                            height={40}
                            className="object-contain"
                        />
                        <h1 className="text-2xl">POR DEFINIR</h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}
