'use client'

import { useEffect, useState } from 'react'

interface Props {
    className?: string
}

export default function LoadingOverlay({ className }: Props) {
    const [toggle, setToggle] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setToggle((prevToggle) => !prevToggle)
        }, 3500)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className={`${className ? className : ''} bg-pylos-900 fixed left-0 top-0 right-0 w-full h-[100vh] z-[9999] text-white flex items-center justify-center text-4xl font-bold font-edu`}>
            <div className="word-wrapper">
                <span className={`word1 ${toggle ? 'anim1Word1' : 'anim2Word1'} transition-transform delay-75`}>Diversión, </span>
            </div>
            <div className="word-wrapper">
                <span className={`word2 ${toggle ? 'anim1Word2' : 'anim2Word2'} ml-2 transition-transform delay-75`}>Aventura, </span>
            </div>
            <div className="word-wrapper">
                <span className={`word3 ${toggle ? 'anim1Word3' : 'anim2Word3'} ml-2 transition-transform delay-75`}>Aprendizaje.</span>
            </div>
        </div>
    )
}
