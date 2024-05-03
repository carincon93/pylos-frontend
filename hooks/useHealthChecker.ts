'use client'

import { useEffect, useState } from 'react'

export function useHealthChecker() {
    const [checking, setChecking] = useState(false)

    useEffect(() => {
        // Realizar la primera verificación de salud al montar el componente
        checkHealth()
    }, [])

    const checkHealth = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/healthcheck`)
            if (!response.ok) {
                setChecking(true)
            } else {
                setChecking(false)
            }
        } catch (error) {
            console.error('Error checking health:', error)
            setChecking(true)
        }
    }

    return { checking }
}
