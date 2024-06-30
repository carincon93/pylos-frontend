'use client'

import { KeyboardControls, Loader, SoftShadows } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo } from 'react'
import { Experience } from '@/app/components/game/Experience'

const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
    { name: 'run', keys: ['Shift'] },
]

function App() {
    return (
        <KeyboardControls map={keyboardMap}>
            <Canvas
                shadows
                camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}
                style={{ height: '100vh' }}>
                <color
                    attach="background"
                    args={['#9104a4']}
                />
                <Suspense>
                    <SoftShadows size={42} />
                    <Experience />
                </Suspense>
            </Canvas>
        </KeyboardControls>
    )
}

export default App
