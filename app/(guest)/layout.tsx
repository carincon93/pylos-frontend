import Image from 'next/image'

export default function GuestLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex min-h-screen flex-col justify-between items-center pb-22 lg:px-0 fondo z-[1]">
            <div className="lg:max-w-5xl w-full mx-auto text-left lg:mt-0 grow flex flex-col items-center justify-center gap-y-10 relative overflow-hidden">
                {children}

                <Image
                    src="/anfora.webp"
                    alt="Planeta Ánfora"
                    width={240}
                    height={40}
                    className="object-contain absolute bottom-10 -left-10 md:bottom-40 md:left-[14%] 2xl:bottom-40 2xl:left-[0%] -z-[1]"
                />
                <Image
                    src="/planeta2.webp"
                    alt="planetaVerde"
                    width={240}
                    height={40}
                    className="object-contain absolute top-36 md:top-16 md:right-[15%] 2xl:top-32 2xl:right-[0%] -z-[1]"
                />
                <Image
                    src="/planeta3.webp"
                    alt="PlanetMorado"
                    width={240}
                    height={40}
                    className="object-contain absolute bottom-10 -right-10 md:bottom-60 md:right-[14%] 2xl:bottom-60 2xl:right-[0%] -z-[1]"
                />
                <Image
                    src="/planeta4.webp"
                    alt="planetaRosa"
                    width={240}
                    height={40}
                    className="object-contain absolute -top-10 -right-10 md:bottom-0 md:left-[38%] 2xl:bottom-10 2xl:left-[45%] -z-[1]"
                />
                <Image
                    src="/planeta5.webp"
                    alt="planetaAzul"
                    width={240}
                    height={40}
                    className="object-contain absolute -top-4 -left-4 md:top-32 md:left-[10%] 2xl:top-40 2xl:left-[0%] -z-[1]"
                />
            </div>
        </main>
    )
}
