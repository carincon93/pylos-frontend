import { Environment, OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Map } from './Map'
import { CharacterController } from './CharacterController'
import { useRef } from 'react'
import { Physics } from '@react-three/rapier'

export const Experience = () => {
    const shadowCameraRef = useRef()

    return (
        <>
            <OrbitControls />
            <Environment preset="sunset" />
            <directionalLight
                intensity={0.65}
                castShadow
                position={[-15, 10, 15]}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.00005}>
                <OrthographicCamera
                    left={-22}
                    right={15}
                    top={10}
                    bottom={-20}
                    ref={shadowCameraRef}
                    attach={'shadow-camera'}
                />
            </directionalLight>
            <Physics debug={process.env.NEXT_PUBLIC_DEBUG == 'true'}>
                <Map position={[-6, -7, 0]} />
                <CharacterController />
            </Physics>
        </>
    )
}
