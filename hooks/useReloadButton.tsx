import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { Mascota } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'

export function useReloadButton(timeout: number): [boolean, Mascota[] | undefined] {
    const [showReloadButton, setShowReloadButton] = useState(false)
    const { data: mascotas } = useSWR<Mascota[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/mascota`, fetcher)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowReloadButton(true)
        }, timeout)

        return () => clearTimeout(timeoutId)
    }, [timeout])

    return [showReloadButton, mascotas]
}
