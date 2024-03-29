'use client'

import React, { createContext, useContext, useState } from 'react'

interface AppContextType {
    contextData: object | null
    setContextData: (contextData: object) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [contextData, setContextData] = useState<object>({})

    return <AppContext.Provider value={{ contextData, setContextData }}>{children}</AppContext.Provider>
}

export const useContextData = (): AppContextType => {
    const context = useContext(AppContext)

    if (!context) {
        throw new Error('useContextData debe ser utilizado dentro de un RolProvider')
    }

    return context
}
