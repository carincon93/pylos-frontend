import { CharacterController } from '../CharacterController'
import { useRef } from 'react'
import { Environment, OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { LandscapeAnforaModel } from './LandscapeAnfora'
import { useGameStore } from '@/lib/store'

const CameraComponent = () => {
    const cameraRef = useRef()

    return (
        <>
            <PerspectiveCamera
                makeDefault
                ref={cameraRef}
                fov={40}
                position={[0.2285654143609755, 231.10896102590522, 0.23774163062832884]}
                rotation={[-1.56, 0.001, 9.65]}
            />
        </>
    )
}

export const AnforaExperience = () => {
    const showMap = useGameStore((state) => state.showMap)

    return (
        <>
            {showMap && <CameraComponent />}
            {process.env.NEXT_PUBLIC_DEBUG_ORBIT_CONTROLS == 'true' && <OrbitControls />}
            <Environment preset="sunset" />
            <directionalLight
                intensity={0.65}
                castShadow
                position={[-5, 10, 25]}
                // shadow-mapSize-width={2048}
                // shadow-mapSize-height={2048}
                shadow-bias={-0.00005}></directionalLight>
            <Physics debug={process.env.NEXT_PUBLIC_DEBUG == 'true'}>
                <LandscapeAnforaModel position={[0, -69, 1]} />
                <CharacterController />
            </Physics>
        </>
    )
}
