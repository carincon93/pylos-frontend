import { Map } from './Map'
import { CharacterController } from '../CharacterController'
import { useRef } from 'react'
import { Environment, OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'

const CameraComponent = () => {
    const controlsRef = useRef()
    const cameraRef = useRef()

    useFrame(() => {
        if (controlsRef.current) {
            const { x, y, z } = controlsRef.current.object.position
            console.log(`Camera position: x: ${x}, y: ${y}, z: ${z}`)
        }
    })

    return (
        <>
            <perspectiveCamera
                ref={cameraRef}
                position={[0, 0, 5]}
            />
            <OrbitControls ref={controlsRef} />
        </>
    )
}

export const AnforaExperience = () => {
    const shadowCameraRef = useRef()

    return (
        <>
            {/* <CameraComponent /> */}
            <Environment preset="sunset" />
            <directionalLight
                intensity={0.65}
                castShadow
                position={[-15, 20, 15]}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.00005}></directionalLight>
            <Physics debug={process.env.NEXT_PUBLIC_DEBUG == 'true'}>
                <Map position={[-6, -6.56, 0]} />
                <CharacterController />
            </Physics>
        </>
    )
}
