import MeshComponent from './MeshComponent'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useEffect } from 'react'
import { useGameStore } from '@/lib/store'

export const Map = ({ ...props }) => {
    const map = useGLTF('/models/MapTest.gltf')

    const setSelectedAnforaForm = useGameStore((state) => state.setSelectedAnforaForm)
    const setActiveForm = useGameStore((state) => state.setActiveForm)

    useEffect(() => {
        map.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    })

    return (
        <RigidBody
            colliders="trimesh"
            type="fixed">
            <primitive
                object={map.scene}
                {...props}
            />
            <MeshComponent
                position={[2, -6, 0]}
                onClick={() => {
                    setSelectedAnforaForm(1), setActiveForm(true)
                }}
            />

            <MeshComponent
                position={[10, -6, 0]}
                onClick={() => {
                    setSelectedAnforaForm(2), setActiveForm(true)
                }}
            />

            <MeshComponent
                position={[20, -6, 0]}
                onClick={() => {
                    setSelectedAnforaForm(3), setActiveForm(true)
                }}
            />

            <MeshComponent
                position={[30, -6, 0]}
                onClick={() => {
                    setSelectedAnforaForm(4), setActiveForm(true)
                }}
            />

            <MeshComponent
                position={[40, -6, 0]}
                onClick={() => {
                    setSelectedAnforaForm(5), setActiveForm(true)
                }}
            />
        </RigidBody>
    )
}

useGLTF.preload('/models/MapTest.gltf')
