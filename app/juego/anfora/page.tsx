'use client'

import { Loader, SoftShadows } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Suspense, useMemo } from 'react'
import { Experience } from '@/app/components/game/Experience'

function App() {
    return (
        <Canvas
            shadows
            camera={{ position: [0, 30, 3], fov: 30 }}
            style={{ height: '100vh' }}>
            <color
                attach="background"
                args={['#9104a4']}
            />
            <Suspense>
                <Physics debug>
                    <SoftShadows size={42} />
                    <Experience />
                </Physics>
            </Suspense>
        </Canvas>
    )
}

export default App
