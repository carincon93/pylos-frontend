import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useGameStore } from '@/lib/store'
import { RigidBody } from '@react-three/rapier'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'

export function LandscapeAnforaModel(props) {
    const { nodes, materials } = useGLTF('/models/AnforaLandscape.glb')

    const setQtyCorrectOptions = useGameStore((state) => state.setQtyCorrectOptions)
    const setSelectedAnforaForm = useGameStore((state) => state.setSelectedAnforaForm)
    const setActiveForm = useGameStore((state) => state.setActiveForm)
    const { playSound } = useAudioPlayer()

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
                    position={[0, 16.028, 0]}
                    rotation={[0, 0, -0.738]}
                    scale={0.901}
                />
                <group
                    position={[-11.605, 0.165, -2.193]}
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
                    position={[-4.974, -0.067, -8.33]}
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
                    position={[2.431, 0.117, -6.176]}
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
                    position={[9.349, 0.117, 2.103]}
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
                    position={[-0.747, 0.282, -1.047]}
                    rotation={[-1.421, 0.831, 1.393]}
                    scale={[0.252, 0.252, 0.071]}
                    onClick={() => {
                        playSound('phoneShowed'), setSelectedAnforaForm(5), setActiveForm(true), setQtyCorrectOptions(0)
                    }}
                />
                <group
                    position={[-0.059, 0.137, 6.809]}
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
                    position={[-4.891, 0.562, 7.349]}
                    rotation={[1.592, 0.018, -2.434]}
                    scale={[0.452, 0.672, 0.454]}
                    onClick={() => {
                        playSound('phoneShowed'), setSelectedAnforaForm(1), setActiveForm(true), setQtyCorrectOptions(0)
                    }}
                />
                <group
                    position={[-2.29, 0.42, 0.594]}
                    rotation={[-0.929, -0.956, -0.863]}
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
                    position={[10.744, 0.139, -1.116]}
                    rotation={[0.165, 0.023, 0.938]}
                    scale={0.005}
                    onClick={() => {
                        playSound('phoneShowed'), setSelectedAnforaForm(3), setActiveForm(true), setQtyCorrectOptions(0)
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
                    position={[4.479, 0.246, -1.863]}
                    rotation={[1.797, -0.018, 0.585]}
                    scale={[0.386, 1.123, 0.386]}
                    onClick={() => {
                        playSound('phoneShowed'), setSelectedAnforaForm(4), setActiveForm(true), setQtyCorrectOptions(0)
                    }}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sistema_de_navegacion.geometry}
                    material={materials['Material_0.006']}
                    position={[-2.673, 0.063, -7.073]}
                    scale={[0.061, 0.01, 0.061]}
                    onClick={() => {
                        playSound('phoneShowed'), setSelectedAnforaForm(2), setActiveForm(true), setQtyCorrectOptions(0)
                    }}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane.geometry}
                    material={materials.Grass}
                    scale={13.403}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube.geometry}
                    material={nodes.Cube.material}
                    position={[-0.91, 0.088, 0.46]}
                    scale={0.021}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube001.geometry}
                    material={nodes.Cube001.material}
                    position={[-1.171, 0.011, 0.736]}
                    scale={0.021}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube002.geometry}
                    material={nodes.Cube002.material}
                    position={[-1.332, 0.079, 0.104]}
                    scale={0.021}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube003.geometry}
                    material={nodes.Cube003.material}
                    position={[-1.132, 0.065, 0.46]}
                    scale={0.029}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube004.geometry}
                    material={nodes.Cube004.material}
                    position={[-1.519, -0.003, 0.878]}
                    scale={0.021}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube005.geometry}
                    material={nodes.Cube005.material}
                    position={[4.659, 0.011, -1.396]}
                    scale={0.021}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube006.geometry}
                    material={nodes.Cube006.material}
                    position={[4.427, 0.011, -1.67]}
                    scale={0.021}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube007.geometry}
                    material={nodes.Cube007.material}
                    position={[4.092, 0.011, -1.396]}
                    scale={0.021}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube008.geometry}
                    material={nodes.Cube008.material}
                    position={[10.135, -0.037, -1.396]}
                    scale={0.021}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube009.geometry}
                    material={nodes.Cube009.material}
                    position={[10.001, -0.166, -0.811]}
                    scale={0.021}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube010.geometry}
                    material={nodes.Cube010.material}
                    position={[-4.184, 0.406, 6.976]}
                    scale={0.021}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube011.geometry}
                    material={nodes.Cube011.material}
                    position={[-4.353, 0.406, 6.371]}
                    scale={0.021}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube012.geometry}
                    material={nodes.Cube012.material}
                    position={[-3.049, 0.002, -5.875]}
                    scale={0.021}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube013.geometry}
                    material={nodes.Cube013.material}
                    position={[-2.779, 0.002, -6.275]}
                    scale={0.021}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube014.geometry}
                    material={nodes.Cube014.material}
                    position={[-2.761, 0.002, -6.612]}
                    scale={0.021}
                />
            </group>
        </RigidBody>
    )
}

useGLTF.preload('/models/AnforaLandscape.glb')
