'use client'

import { KeyboardControls, Loader, useFont, useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Leva } from 'leva'
import { Suspense, useMemo } from 'react'
import { Experience } from '../../components/Experience.jsx'
import { Controls } from '@/lib/utils'

function App() {
    const map = useMemo(
        () => [
            { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
            { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
            { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
            { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
            { name: Controls.jump, keys: ['Space'] },
        ],
        [],
    )

    return (
        <KeyboardControls map={map}>
            <Leva collapsed />
            <Canvas
                shadows
                camera={{ position: [0, 20, 14], fov: 42 }}
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
                <color
                    attach="background"
                    args={['#eec481']}
                />
                <Suspense>
                    <Physics>
                        <Experience />
                    </Physics>
                </Suspense>
            </Canvas>
            <Loader />
        </KeyboardControls>
    )
}

export default App
