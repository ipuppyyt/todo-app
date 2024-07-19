import React from 'react'

interface PlusIconProps {
    width?: number;
    height?: number;
    color: string;
    thickness?: number;
}

const PlusIcon = ({ width = 24, height = 24, color, thickness = 2 }: PlusIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}

export default PlusIcon