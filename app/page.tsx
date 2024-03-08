import Image from 'next/image'
import Link from 'next/link'
import { Logo } from './components/Logo'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col justify-between pb-22 px-4 lg:px-0">
            <div className="lg:max-w-5xl w-full mx-auto lg:flex items-center">
                <div className="flex justify-center gap-x-4 relative top-12 lg:top-0">
                    <Image src="/isotipo.webp" alt="Pylos Isotipo" width={80} height={40} priority className="object-contain" />
                    <Logo className="w-52 dark:drop-shadow-[255_255_255.3rem_#ffffff70] dark:invert" />
                </div>
                <nav id="header-nav" className="flex flex-1 items-center justify-around lg:ml-20 fixed inset-x-0 top-4 lg:top-0 lg:relative text-xs lg:text-lg">
                    <Link className="font-bold" href="#">
                        Home
                    </Link>
                    <Link className="font-bold" href="#">
                        Test
                    </Link>
                    <Link className="font-bold" href="/game">
                        Download
                    </Link>
                    <Link className="font-bold" href="#">
                        Support
                    </Link>
                    <Link className="font-bold border-2 py-1 px-8 rounded-full border-sky-400" href="#">
                        Login
                    </Link>
                </nav>
            </div>

            <div className="lg:max-w-5xl w-full mx-auto text-left mt-20 lg:mt-0">
                <div className="grid lg:grid-cols-3 items-center">
                    <div className="col-span-2 flex flex-col text-center lg:text-left gap-y-10 lg:gap-y-4">
                        <h1 className="text-7xl font-bold">Aprender</h1>
                        <h2 className="text-5xl text-sky-300 font-light">Nunca fue tan divertido</h2>

                        <p className="lg:mr-48">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                    <div className="col-span-2 lg:col-auto hidden lg:block">
                        <Image src="/isotipo.webp" alt="Pylos Isotipo" width={350} height={400} className="object-contain mx-auto" />
                    </div>
                </div>

                <div className="flex gap-x-4 items-center justify-center lg:justify-start my-10 lg:my-0">
                    <Link href="#" className="py-4 px-10 font-bold rounded-full border-2 border-sky-400">
                        More Info
                    </Link>
                    <Link href="/game" className="py-4 px-8 font-bold rounded-full bg-sky-400">
                        Download Now
                    </Link>
                </div>
            </div>

            <div className="text-center lg:max-w-5xl w-full mx-auto flex lg:justify-end flex-wrap lg:flex-nowrap justify-center mt-20 lg:mt-0">
                <div>
                    <Image src="/tacto-planet.webp" alt="Planeta tacto" width={100} height={40} className="object-contain" />
                    <h2>TACTO</h2>
                </div>

                <div>
                    <Image src="/visual-planet.webp" alt="Planeta visual" width={100} height={40} className="object-contain" />

                    <h2>VISUAL</h2>
                </div>

                <div>
                    <Image src="/escucha-planet.webp" alt="Planeta escucha" width={100} height={40} className="object-contain" />

                    <h2>ESCUCHA</h2>
                </div>

                <div>
                    <div className="flex">
                        <Image src="/socioemocional-planet1.webp" alt="Planeta socioemocional" width={100} height={40} className="object-contain" />
                        <Image src="/socioemocional-planet2.webp" alt="Planeta socioemocional" width={100} height={40} className="object-contain" />
                    </div>
                    <h2>SOCIOEMOCIONAL</h2>
                </div>
            </div>
        </main>
    )
}
