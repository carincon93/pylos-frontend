import MeshComponent from './MeshComponent'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useEffect } from 'react'
import { useGameStore } from '@/lib/store'
import { MotorModel } from './Motor'
import { AlaModel } from './Ala'
import { PanelModel } from './Panel'
import { BidonModel } from './Bidon'
import { NavegacionModel } from './Navegacion'

export const Map = ({ ...props }) => {
    const map = useGLTF('/models/Anfora.glb')

    const setQtyCorrectOptions = useGameStore((state) => state.setQtyCorrectOptions)
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
                scale={[20, 20, 20]}
                {...props}
            />

            {/* <AlaModel
                onClick={() => {
                    setSelectedAnforaForm(1), setActiveForm(true), setQtyCorrectOptions(0)
                }}
            /> */}

            <MotorModel
                scale={0.3}
                onClick={() => {
                    setSelectedAnforaForm(2), setActiveForm(true), setQtyCorrectOptions(0)
                }}
            />

            {/*   <PanelModel
                scale={0.3}
                onClick={() => {
                    setSelectedAnforaForm(3), setActiveForm(true), setQtyCorrectOptions(0)
                }}
            />
            */}

            <BidonModel
                scale={0.2}
                onClick={() => {
                    setSelectedAnforaForm(4), setActiveForm(true), setQtyCorrectOptions(0)
                }}
            />

            <NavegacionModel
                scale={0.3}
                onClick={() => {
                    setSelectedAnforaForm(5), setActiveForm(true), setQtyCorrectOptions(0)
                }}
            />
        </RigidBody>
    )
}

useGLTF.preload('/models/Anfora.glb')
