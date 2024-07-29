'use client'

import { ANFORA_ROUTE } from '@/utils/routes'
import Link from 'next/link'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'

export default function EmpezarAventuraCarousel() {
    const { playSound, pauseSound, stopSound } = useAudioPlayer()

    return (
        <Carousel
            orientation="vertical"
            className="mt-32 md:mt-0">
            <CarouselContent className="h-[320px] md:h-[240px]">
                <CarouselItem>
                    <Link
                        href={ANFORA_ROUTE}
                        className="flex flex-col md:flex-row justify-center items-center w-full hover:opacity-80"
                        onMouseEnter={() => {
                            playSound('phoneShowed')
                        }}>
                        <Image
                            src="/anfora.webp"
                            alt="Planeta Ánfora"
                            width={240}
                            height={40}
                            className="object-contain"
                        />
                        <h1 className="text-2xl mt-8">ÁNFORA</h1>
                    </Link>
                </CarouselItem>
                <CarouselItem>
                    <Link
                        href="#"
                        className="flex flex-col md:flex-row justify-center items-center w-full hover:opacity-60 grayscale pointer-events-none">
                        <Image
                            src="/planeta2.webp"
                            alt="planetaVerde"
                            width={240}
                            height={40}
                            className="object-contain"
                        />
                        <h1 className="text-2xl mt-6">POR DEFINIR</h1>
                    </Link>
                </CarouselItem>
                <CarouselItem>
                    <Link
                        href="#"
                        className="flex flex-col md:flex-row justify-center items-center w-full hover:opacity-60 grayscale pointer-events-none">
                        <Image
                            src="/planeta3.webp"
                            alt="PlanetMorado"
                            width={240}
                            height={40}
                            className="object-contain"
                        />
                        <h1 className="text-2xl mt-6">POR DEFINIR</h1>
                    </Link>
                </CarouselItem>
                <CarouselItem>
                    <Link
                        href="#"
                        className="flex flex-col md:flex-row justify-center items-center w-full hover:opacity-60 grayscale pointer-events-none">
                        <Image
                            src="/planeta4.webp"
                            alt="planetaRosa"
                            width={240}
                            height={40}
                            className="object-contain"
                        />
                        <h1 className="text-2xl mt-6">POR DEFINIR</h1>
                    </Link>
                </CarouselItem>
                <CarouselItem>
                    <Link
                        href="#"
                        className="flex flex-col md:flex-row justify-center items-center w-full hover:opacity-60 grayscale pointer-events-none">
                        <Image
                            src="/planeta5.webp"
                            alt="planetaAzul"
                            width={240}
                            height={40}
                            className="object-contain"
                        />
                        <h1 className="text-2xl mt-6">POR DEFINIR</h1>
                    </Link>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
