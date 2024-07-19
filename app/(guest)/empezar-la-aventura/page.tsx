import Link from 'next/link'
import { LOGIN_ROUTE, REGISTER_ROUTE } from '@/utils/routes'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Empezar la aventura',
}

export default function EmpezarAventuraPage() {
    return (
        <>
            <h1 className="text-6xl xl:text-6xl 2xl:text-8xl text-center font-bold text-white font-edu">
                Empezar <br /> la aventura
            </h1>

            <div className="flex flex-col gap-y-4 items-center justify-center lg:justify-start">
                <Link
                    href={REGISTER_ROUTE}
                    className="py-4 px-16 font-bold rounded-full bg-primary hover:bg-primary/90 text-white">
                    Crear cuenta
                </Link>

                <Link
                    href={LOGIN_ROUTE}
                    className="py-4 px-16 font-bold rounded-full bg-secondary hover:bg-secondary/90 text-white">
                    Ingresar
                </Link>
            </div>
        </>
    )
}
