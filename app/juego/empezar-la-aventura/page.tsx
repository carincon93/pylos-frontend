import Link from 'next/link'
import { ANFORA_ROUTE } from '@/utils/routes'
import { Isotipo } from '@/app/components/Isotipo'
import { Logo } from '@/app/components/Logo'
import { Metadata } from 'next'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

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
            <Carousel
                orientation="vertical"
                className="mt-32 md:mt-0">
                <CarouselContent className="h-[286px] md:h-[260px]">
                    <CarouselItem>
                        <Link
                            href={ANFORA_ROUTE}
                            className="flex flex-col md:flex-row justify-center items-center w-full hover:opacity-80">
                            <Image
                                src="/anfora.webp"
                                alt="Planeta Ánfora"
                                width={240}
                                height={40}
                                className="object-contain"
                            />
                            <h1 className="text-2xl">ÁNFORA</h1>
                        </Link>
                    </CarouselItem>
                    <CarouselItem>
                        <Link
                            href="#"
                            className="flex items-center hover:opacity-60 grayscale pointer-events-none">
                            <Image
                                src="/planeta2.webp"
                                alt="planetaVerde"
                                width={240}
                                height={40}
                                className="object-contain"
                            />
                            <h1 className="text-2xl">POR DEFINIR</h1>
                        </Link>
                    </CarouselItem>
                    <CarouselItem>
                        <Link
                            href="#"
                            className="flex items-center hover:opacity-60 grayscale pointer-events-none">
                            <Image
                                src="/planeta3.webp"
                                alt="PlanetMorado"
                                width={240}
                                height={40}
                                className="object-contain"
                            />
                            <h1 className="text-2xl">POR DEFINIR</h1>
                        </Link>
                    </CarouselItem>
                    <CarouselItem>
                        <Link
                            href="#"
                            className="flex items-center hover:opacity-60 grayscale pointer-events-none">
                            <Image
                                src="/planeta4.webp"
                                alt="planetaRosa"
                                width={240}
                                height={40}
                                className="object-contain"
                            />
                            <h1 className="text-2xl">POR DEFINIR</h1>
                        </Link>
                    </CarouselItem>
                    <CarouselItem>
                        <Link
                            href="#"
                            className="flex items-center hover:opacity-60 grayscale pointer-events-none">
                            <Image
                                src="/planeta5.webp"
                                alt="planetaAzul"
                                width={240}
                                height={40}
                                className="object-contain"
                            />
                            <h1 className="text-2xl">POR DEFINIR</h1>
                        </Link>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}
