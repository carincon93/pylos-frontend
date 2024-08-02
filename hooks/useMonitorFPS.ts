import { useEffect, useState } from 'react'

const useMonitorFPS = (threshold: number, checkInterval: number = 1000) => {
    const [fps, setFps] = useState<number>(60) // Valor inicial razonable
    const [warning, setWarning] = useState<boolean>(false)

    useEffect(() => {
        let frameCount = 0
        let lastTime = performance.now()

        const checkFPS = () => {
            const now = performance.now()
            const delta = (now - lastTime) / 1000
            const currentFps = frameCount / delta
            setFps(currentFps)
            setWarning(currentFps < threshold)
            frameCount = 0
            lastTime = now
        }

        const frameHandler = () => {
            frameCount++
            requestAnimationFrame(frameHandler)
        }

        frameHandler()
        const interval = setInterval(checkFPS, checkInterval)

        return () => clearInterval(interval)
    }, [threshold, checkInterval])

    return { fps, warning }
}

export default useMonitorFPS
