import React from 'react'

interface Props {
  size: number
  color: string
}

const BellsIcon: React.FC<Props> = ({ size, color }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="-3 0 72 72"
      className="SuitIcon"
    >
      <circle stroke={color} fill="#ffffff" cx="33" cy="65" r="5" />
      <circle fill="#ffffff" stroke="none" cx="33" cy="33" r="32" />
      <path
        fill="#ffffff"
        stroke="none"
        d="M2.5 23 L63.5 23 Q67 33 63.5 43 L2.5 43 Q-1 33 2.5 23"
      />
      <path stroke={color} d="M6 43 L6 50" />
      <path stroke={color} d="M9 43 L9 54" />
      <path stroke={color} d="M12 43 L12 54" />
      <path stroke={color} d="M15 43 L15 54" />
      <path stroke={color} d="M18 43 L18 54" />
      <path stroke={color} d="M21 43 L21 54" />
      <path stroke={color} d="M24 43 L24 54" />
      <path stroke={color} d="M27 43 L27 54" />
      <path stroke={color} d="M30 43 L30 54" />
      <path stroke={color} d="M33 23 L33 54" />
      <path stroke={color} d="M39 23 L39 54" />
      <path stroke={color} d="M45 23 L45 54" />
      <path stroke={color} d="M51 23 L51 54" />
      <path stroke={color} d="M57 23 L57 54" />
      <path stroke={color} d="M63 23 L63 43" />
      <path
        stroke={color}
        fill="#ffffff"
        d="M27 48 Q25.5 45.5 19 43 Q15 45 15 50 L29 65"
      />
      <path
        stroke={color}
        fill="#ffffff"
        d="M39 48 Q40.5 45.5 47 43 Q51 45 51 50 L37 65"
      />
      <path
        stroke={color}
        fill="#ffffff"
        d="M29 65 Q20 50 33 43 Q46 50 37 65"
      />
      <path stroke="none" fill="#ffffff" d="M3.1 43 L2.8 43 Q6.5 60 29.4 65" />
      <path
        stroke={color}
        fill="#ffffff"
        d="M29 65 Q21 52 15 50 Q8 47 2.8 43"
      />
      <path
        stroke="none"
        fill="#ffffff"
        d="M62.9 43 L63.2 43 Q59.5 60 36.6 65"
      />
      <path
        stroke={color}
        fill="#ffffff"
        d="M37 65 Q45 52 51 50 Q58 47 63.2 43"
      />

      <circle stroke={color} fill="none" cx="33" cy="33" r="32" />
      <path
        stroke={color}
        fill="none"
        d="M28 1.2 Q28 6.5 33 6.5 Q38 6.5 38 1.2"
      />
      <path stroke={color} d="M2.8 23 L63.2 23" />
      <path stroke={color} d="M2.8 43 L63.2 43" />
      <circle stroke={color} fill={color} cx="10" cy="33" r="5" />
      <circle stroke={color} fill={color} cx="33" cy="33" r="5" />
      <circle stroke={color} fill={color} cx="56" cy="33" r="5" />
    </svg>
  )
}

export default BellsIcon
