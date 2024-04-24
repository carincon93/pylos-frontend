import { Metadata } from 'next'
import HistoriaEpica from './_historia-epica'

export const metadata: Metadata = {
    title: 'Introducción',
}

export default async function IntroduccionPage() {
    return <HistoriaEpica />
}
