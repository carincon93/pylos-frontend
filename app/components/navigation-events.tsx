'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useHealthChecker } from '@/hooks/useHealthChecker'
import { getProfile } from '@/lib/actions'
import { useContextData } from '../context/AppContext'

export function NavigationEvents() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { setProfileUserData } = useContextData()

    const { checking } = useHealthChecker()

    useEffect(() => {
        const url = `${pathname}?${searchParams}`
        console.log(url)
        // You can now use the current URL
        // ...
    }, [pathname, searchParams])

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await getProfile()
                setProfileUserData(profile)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchUserProfile()
    }, [])

    if (checking) {
        return <div className="fixed top-0 left-0 z-[9999] p-4">El servidor no está respondiendo. Reintentando...</div>
    }

    return
}
