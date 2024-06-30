import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useEffect } from 'react'

export const Map = ({ ...props }) => {
    const map = useGLTF('/models/MapTest.gltf')

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
        </RigidBody>
    )
}

useGLTF.preload('/models/MapTest.gltf')