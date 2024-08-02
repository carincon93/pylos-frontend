'use client'

import Link from 'next/link'
import { LOGIN_ROUTE, REGISTER_ROUTE } from '@/utils/routes'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'

export default function EmpezarAventuraLinksSection() {
    const { playSound, pauseSound, stopSound } = useAudioPlayer()

    return (
        <div className="flex flex-col gap-y-4 items-center justify-center lg:justify-start">
            <Link
                href={REGISTER_ROUTE}
                onMouseEnter={() => playSound('phoneShowed')}
                className="py-4 px-16 font-bold rounded-full bg-primary hover:bg-primary/90 text-white">
                Crear cuenta
            </Link>

            <Link
                href={LOGIN_ROUTE}
                onMouseEnter={() => playSound('phoneShowed')}
                className="py-4 px-16 font-bold rounded-full bg-secondary hover:bg-secondary/90 text-white">
                Ingresar
            </Link>
        </div>
    )
}
