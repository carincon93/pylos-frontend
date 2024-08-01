import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useGameStore } from '@/lib/store'
import { RigidBody } from '@react-three/rapier'

export function LandscapeAnforaModel(props) {
    const { nodes, materials } = useGLTF('/models/AnforaLandscape.glb')

    const setQtyCorrectOptions = useGameStore((state) => state.setQtyCorrectOptions)
    const setSelectedAnforaForm = useGameStore((state) => state.setSelectedAnforaForm)
    const setActiveForm = useGameStore((state) => state.setActiveForm)
    return (
        <RigidBody
            colliders="trimesh"
            type="fixed">
            <group
                {...props}
                dispose={null}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.satellite.geometry}
                    material={materials.None}
                    position={[0, 7.821, 0]}
                    rotation={[0, 0, -0.738]}
                    scale={0.901}
                />
                <group scale={16.132}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane001_1.geometry}
                        material={materials['Grass.001']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane001_2.geometry}
                        material={materials['Water.001']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane001_3.geometry}
                        material={materials['Sand.001']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane001_4.geometry}
                        material={materials.Ice}
                    />
                </group>
                <group
                    position={[-11.694, 0.675, -0.293]}
                    scale={1.742}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.mesh1976787297001.geometry}
                        material={materials['mat7.006']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.mesh1976787297001_1.geometry}
                        material={materials['mat8.004']}
                    />
                </group>
                <group
                    position={[-9.424, 0.764, -7.36]}
                    rotation={[0, 1.179, 0]}
                    scale={2.094}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.mesh1976787297002.geometry}
                        material={materials['mat7.007']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.mesh1976787297002_1.geometry}
                        material={materials['mat8.005']}
                    />
                </group>
                <group
                    position={[5.334, 0.921, -6.936]}
                    rotation={[-Math.PI, 1.268, -Math.PI]}
                    scale={2.747}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.mesh1976787297003.geometry}
                        material={materials['mat7.008']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.mesh1976787297003_1.geometry}
                        material={materials['mat8.006']}
                    />
                </group>
                <group
                    position={[12.252, 0.921, 1.343]}
                    rotation={[-Math.PI, 1.268, -Math.PI]}
                    scale={2.747}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.mesh1976787297004.geometry}
                        material={materials['mat7.009']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.mesh1976787297004_1.geometry}
                        material={materials['mat8.007']}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bidon.geometry}
                    material={materials['Material_0.007']}
                    position={[6.347, 0.073, -5.902]}
                    rotation={[-0.559, 0, 0]}
                    scale={[0.162, 0.162, 0.045]}
                    onClick={() => {
                        setSelectedAnforaForm(5), setActiveForm(true), setQtyCorrectOptions(0)
                    }}
                />
                <group
                    position={[-0.201, 0.954, 9.853]}
                    scale={2.79}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.mesh1976787297.geometry}
                        material={materials.mat7}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.mesh1976787297_1.geometry}
                        material={materials.mat8}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Motor.geometry}
                    material={materials['Material_0.004']}
                    position={[-7.63, 0.809, 7.349]}
                    rotation={[1.592, 0.018, -2.434]}
                    scale={[0.452, 0.672, 0.454]}
                    onClick={() => {
                        setSelectedAnforaForm(1), setActiveForm(true), setQtyCorrectOptions(0)
                    }}
                />
                <group
                    position={[-5.558, 0.455, 3.658]}
                    rotation={[-0.409, 0, 0]}
                    scale={3.181}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.mesh2037710231.geometry}
                        material={materials['mat5.001']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.mesh2037710231_1.geometry}
                        material={materials['mat17.001']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.mesh2037710231_2.geometry}
                        material={materials['mat21.001']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.mesh2037710231_3.geometry}
                        material={materials['mat15.001']}
                    />
                </group>
                <group
                    position={[11.52, 0.249, -1.116]}
                    rotation={[0.017, 0.023, 0.938]}
                    scale={0.005}
                    onClick={() => {
                        setSelectedAnforaForm(3), setActiveForm(true), setQtyCorrectOptions(0)
                    }}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes['10781_Solar-Panels_V1001'].geometry}
                        material={materials['_10781_Solar_Panels_V101___Default.001']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes['10781_Solar-Panels_V1001_1'].geometry}
                        material={materials['_10781_Solar_Panels_V102___Default.001']}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Reactor.geometry}
                    material={materials['Material_0.005']}
                    position={[-0.003, -0.137, -1.329]}
                    rotation={[1.574, -0.024, 0.004]}
                    scale={[0.386, 1.123, 0.386]}
                    onClick={() => {
                        setSelectedAnforaForm(4), setActiveForm(true), setQtyCorrectOptions(0)
                    }}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sistema_de_navegacion.geometry}
                    material={materials['Material_0.006']}
                    position={[-2.673, 2.123, -7.073]}
                    scale={[0.061, 0.01, 0.061]}
                    onClick={() => {
                        setSelectedAnforaForm(2), setActiveForm(true), setQtyCorrectOptions(0)
                    }}
                />
            </group>
        </RigidBody>
    )
}

useGLTF.preload('/models/AnforaLandscape.glb')
