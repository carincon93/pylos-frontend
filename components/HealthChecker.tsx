'use client'

import { useEffect, useState } from 'react'

const HealthChecker = () => {
    const [checking, setChecking] = useState(false)

    useEffect(() => {
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

        // Realizar la primera verificación de salud al montar el componente
        checkHealth()

        // Ejecutar la verificación de salud cada vez que cambia la ruta
        const handleRouteChange = () => {
            checkHealth()
        }
        //  } router.events.on('routeChangeComplete', handleRouteChange)

        // Limpiar el listener cuando el componente se desmonta
        return () => {
            // router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [])

    if (checking) {
        return <div>El servidor no está respondiendo. Reintentando...</div>
    }

    return null
}

export default HealthChecker
