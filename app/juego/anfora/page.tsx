'use client'

import { KeyboardControls, Loader, Stats, useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
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
            { name: Controls.reset, keys: ['KeyR'] },
        ],
        [],
    )

    return (
        <KeyboardControls map={map}>
            <Stats showPanel={1} />
            <Canvas
                shadows
                camera={{ position: [0, 20, 14], fov: 42 }}
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
                <color
                    attach="background"
                    args={['#ffe18a']}
                />
                <Suspense>
                    <Physics debug>
                        <Experience />
                    </Physics>
                </Suspense>
            </Canvas>
            {/* <Loader /> */}
        </KeyboardControls>
    )
}

export default App
