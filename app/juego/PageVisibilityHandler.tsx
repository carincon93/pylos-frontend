'use client'

import { useEffect } from 'react'
import { useGameStore } from '@/lib/store'

const PageVisibilityHandler: React.FC = () => {
    const setPageVisibility = useGameStore((state) => state.setPageVisibility)

    useEffect(() => {
        const handleVisibilityChange = () => {
            setPageVisibility(!document.hidden)
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [setPageVisibility])

    return null
}

export default PageVisibilityHandler
