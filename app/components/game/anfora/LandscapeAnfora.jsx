import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { MotorModel } from './Motor'
import { PanelModel } from './Panel'
import { BidonModel } from './Bidon'
import { NavegacionModel } from './Navegacion'
import { RigidBody } from '@react-three/rapier'
import { useGameStore } from '@/lib/store'
import { StoneModel } from './Stone'

export function LandscapeAnforaModel(props) {
    const { nodes, materials } = useGLTF('/models/LandscapeAnfora.glb')
    const setQtyCorrectOptions = useGameStore((state) => state.setQtyCorrectOptions)
    const setSelectedAnforaForm = useGameStore((state) => state.setSelectedAnforaForm)
    const setActiveForm = useGameStore((state) => state.setActiveForm)
    return (
        <RigidBody
            colliders="trimesh"
            type="fixed">
            <group
                {...props}
                dispose={null}
                scale={[20, 20, 20]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Icosphere001.geometry}
                    material={materials['Material.001']}
                    position={[0, -3.53, 0]}
                    scale={6.752}
                />
                <group
                    position={[-4.398, 0.585, 0.666]}
                    rotation={[-2.988, -0.047, -0.835]}
                    scale={-3.827}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane002_1.geometry}
                        material={materials['Grass.001']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane002_2.geometry}
                        material={materials['Mountain.001']}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane004.geometry}
                    material={materials['Desert.001']}
                    position={[1.806, 1.904, -2.758]}
                    rotation={[2.495, 0.792, -2.829]}
                    scale={[6.297, 2.4, 2.4]}
                />
                <group
                    position={[-0.394, 0.485, -4.764]}
                    rotation={[-1.733, 1.446, -2.006]}
                    scale={-3.827}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane007_1.geometry}
                        material={materials['Grass.002']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane007_2.geometry}
                        material={materials['Mountain.002']}
                    />
                </group>
                <group
                    position={[0.543, 1.103, 4.593]}
                    rotation={[-0.171, -1.252, 2.466]}
                    scale={-3.827}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane008_1.geometry}
                        material={materials['Grass.003']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane008_2.geometry}
                        material={materials['Mountain.003']}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane003.geometry}
                    material={materials.Desert}
                    position={[3.023, 2.124, -2.059]}
                    rotation={[1.399, 1.127, -1.561]}
                    scale={[6.297, 2.4, 2.4]}
                />
                <group
                    position={[-0.635, 1.763, 1.89]}
                    rotation={[0.594, -1.189, -3.008]}
                    scale={-3.827}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane010_1.geometry}
                        material={materials['Grass.004']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane010_2.geometry}
                        material={materials['Mountain.004']}
                    />
                </group>
                <group
                    position={[3.278, 1.808, 2.675]}
                    rotation={[-0.572, -1.252, 2.466]}
                    scale={-3.827}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane011_1.geometry}
                        material={materials['Grass.005']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane011_2.geometry}
                        material={materials['Mountain.005']}
                    />
                </group>
                <group
                    position={[3.278, 1.433, 4.565]}
                    rotation={[-1.132, -0.902, 1.844]}
                    scale={-3.827}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane012_1.geometry}
                        material={materials['Grass.006']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane012_2.geometry}
                        material={materials['Mountain.006']}
                    />
                </group>
                <group
                    position={[-2.215, 0.621, -0.479]}
                    rotation={[-0.171, -1.252, 2.466]}
                    scale={-3.827}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane013.geometry}
                        material={materials['Grass.007']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane013_1.geometry}
                        material={materials['Mountain.007']}
                    />
                </group>
                <group
                    position={[-0.31, 2.718, 0.7]}
                    rotation={[-0.456, 1.036, -2.539]}
                    scale={-3.827}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane014.geometry}
                        material={materials['Grass.008']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane014_1.geometry}
                        material={materials['Mountain.008']}
                    />
                </group>
                <group
                    position={[0.759, 1.362, -0.479]}
                    rotation={[-0.171, -1.252, 2.466]}
                    scale={-3.827}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane015.geometry}
                        material={materials['Grass.009']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane015_1.geometry}
                        material={materials['Mountain.009']}
                    />
                </group>
                <group
                    position={[1.563, 2.885, 2.675]}
                    rotation={[-0.228, -0.97, 2.912]}
                    scale={-3.827}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane016.geometry}
                        material={materials['Grass.010']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane016_1.geometry}
                        material={materials['Mountain.010']}
                    />
                </group>
            </group>

            <MotorModel
                scale={0.3}
                onClick={() => {
                    setSelectedAnforaForm(2), setActiveForm(true), setQtyCorrectOptions(0)
                }}
            />

            <PanelModel
                scale={0.3}
                onClick={() => {
                    setSelectedAnforaForm(3), setActiveForm(true), setQtyCorrectOptions(0)
                }}
            />

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

useGLTF.preload('/models/LandscapeAnfora.glb')
