import { Metadata } from 'next'
import LinksSection from './_links'

export const metadata: Metadata = {
    title: 'Empezar la aventura',
}

export default function EmpezarAventuraLinksSection() {
    return (
        <>
            <h1 className="text-6xl xl:text-6xl 2xl:text-8xl text-center font-bold text-white font-edu">
                Empezar <br /> la aventura
            </h1>

            <LinksSection />
        </>
    )
}
