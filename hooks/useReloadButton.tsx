import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

export function useReloadButton(timeout: number): [boolean, Response | undefined] {
    const [showReloadButton, setShowReloadButton] = useState(false)

    const { data } = useSWR<Response>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/healthcheck`, fetcher)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowReloadButton(true)
        }, timeout)

        return () => clearTimeout(timeoutId)
    }, [timeout])

    return [showReloadButton, data]
}
