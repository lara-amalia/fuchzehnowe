import React from 'react'

interface Props {
  size: number
  color: string
}

const AcornsIcon: React.FC<Props> = ({ size, color }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="-27 0 121 121"
      className="SuitIcon"
    >
      <path
        stroke={color}
        fill="#ffffff"
        d="M13 21 Q13 1 33 1 L33 52 L13 52 Z"
      />
      <path
        stroke={color}
        fill="#ffffff"
        d="M33 1 Q53 1 53 21 L53 52 L33 52 Z"
      />
      <path stroke={color} fill="#ffffff" d="M13 52 L33 52 L33 62 L13 62 Z" />
      <path
        stroke="none"
        fill="#ffffff"
        d="M37 96 Q37 119 16 119 L24 110 Q25 109 27 108 Q29 107 29 102 L29 96"
      />
      <path fill="#ffffff" stroke={color} d="M33 52 L33 62 L53 62 L53 52 Z" />
      <path
        fill="#ffffff"
        stroke={color}
        d="M13 62 Q1 62 1 74 Q1 96 33 96 Q64 96 64 74 Q64 62 54 62 Z"
      />
      <path
        fill={color}
        stroke={color}
        d="M33 66.5 Q28.5 66.5 28.5 71 Q28.5 77 33 87 Q37.5 77 37.5 71 Q37.5 66.5 33 66.5"
      />
      <path
        fill={color}
        stroke={color}
        d="M21 89 Q10 80 10 74 Q10 67 15 67 Q17 67 17 71 Q17 72 16.5 73 Q16 74 16 75 Q16 80 21 89"
      />
      <path
        fill={color}
        stroke={color}
        d="M45 89 Q56 80 56 74 Q56 67 51 67 Q49 67 49 71 Q49 72 49.5 73 Q50 74 50 75 Q50 80 45 89"
      />
      <path stroke={color} d="M33 62 L33 96" />
      <path stroke={color} d="M38.7 1.8 L38.7 62" />
      <path stroke={color} d="M44.4 3 L44.4 62" />
      <path stroke={color} d="M50.1 8.8 L50.1 62" />
    </svg>
  )
}

export default AcornsIcon
