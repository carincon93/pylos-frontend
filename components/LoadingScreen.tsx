import { useProgress } from '@react-three/drei'
import { useEffect } from 'react'

interface LoadingScreenProps {
    started: boolean
    onStarted: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LoadingScreen({ started, onStarted }: LoadingScreenProps) {
    const { progress } = useProgress()

    useEffect(() => {
        setTimeout(() => {
            onStarted(true)
        }, 2000)
    }, [])

    return (
        <>
            <div className={`bg-pylos-900 fixed z-[1000] inset-0 transform transition-transform delay-75 duration-700 ${started ? 'translate-y-[2600px]' : 'translate-y-[0px]'}`}></div>
            <div
                className={`bg-pylos-600 fixed z-[999] inset-0 transform transition-transform rotate-[45deg] delay-150 duration-700 ${
                    started ? 'translate-y-[2600px]' : 'translate-y-[400px]'
                } translate-y-[200px]`}></div>
            <div
                className={`bg-pylos-700 fixed z-[999] inset-0 transform transition-transform rotate-[45deg] delay-200 duration-700 ${
                    started ? 'translate-x-[-2600px]' : 'translate-x-[-400px]'
                } translate-y-[200px]`}></div>
            <div
                className={`bg-pylos-500 fixed z-[999] inset-0 transform transition-transform rotate-[200deg] delay-300 duration-700  ${
                    started ? 'translate-x-[2600px]' : 'translate-x-[1400px]'
                } translate-y-[200px]`}></div>
        </>
    )
}
