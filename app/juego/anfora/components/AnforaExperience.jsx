import { CharacterController } from '../../../../components/CharacterController'
import { Environment, Grid, OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { LandscapeAnforaModel } from './LandscapeAnfora'
import { useGameStore } from '@/lib/store'
import { AnforaModel } from './Anfora'

const SateliteCameraComponent = () => {
    return (
        <>
            <PerspectiveCamera
                makeDefault
                fov={40}
                position={[5, 50, 0]}
                rotation={[-1.56, 0, 9.65]}
            />
        </>
    )
}

const MenuCameraComponent = () => {
    return (
        <>
            <OrthographicCamera
                makeDefault
                zoom={70}
                position={[3, 0.8, 20]}
                rotation={[-0.02, 0.02, 0]}
            />
        </>
    )
}

const Ground = () => {
    const gridConfig = {
        cellSize: 0.5,
        cellThickness: 0.5,
        cellColor: '#6f6f6f',
        sectionSize: 3,
        sectionThickness: 1,
        sectionColor: '#9d4b4b',
        fadeDistance: 30,
        fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true,
    }
    return (
        <Grid
            position={[0, -0.01, 0]}
            args={[10.5, 10.5]}
            {...gridConfig}
        />
    )
}

export const AnforaExperience = () => {
    const showMap = useGameStore((state) => state.showMap)
    const showMenu = useGameStore((state) => state.showMenu)

    return (
        <>
            {showMenu && <MenuCameraComponent />}
            {showMap && <SateliteCameraComponent />}
            {process.env.NEXT_PUBLIC_DEBUG_ORBIT_CONTROLS == 'true' && (
                <>
                    <Ground />
                    <OrbitControls />
                </>
            )}
            <Environment preset="sunset" />
            {showMenu ? (
                <AnforaModel />
            ) : (
                <Physics debug={process.env.NEXT_PUBLIC_DEBUG == 'true'}>
                    <LandscapeAnforaModel position={[5, 0, 0]} />

                    <CharacterController />
                </Physics>
            )}
        </>
    )
}
