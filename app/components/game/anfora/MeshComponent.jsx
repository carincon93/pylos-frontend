import React, { useState } from 'react'

const MeshComponent = ({ position, color, onClick }) => {
    return (
        <mesh
            position={position}
            onClick={onClick}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

export default MeshComponent
