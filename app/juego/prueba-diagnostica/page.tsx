import BackgroundStars from '@/components/BackgroundStars'
import Prueba from './_prueba'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Prueba diagnóstica',
}

export default function PruebaDiagnosticaPage() {
    return (
        <>
            <BackgroundStars />

            <Prueba />
        </>
    )
}
