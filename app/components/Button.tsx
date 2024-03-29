import React from 'react'

interface Props {
    className?: string
    children: React.ReactNode
}

export function Button({ className, children }: Props) {
    return <button className={`${className} py-4 px-16 font-bold uppercase rounded-full bg-sky-400`}>{children}</button>
}
