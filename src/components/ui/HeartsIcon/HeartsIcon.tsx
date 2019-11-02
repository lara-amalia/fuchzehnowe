import React from 'react'

interface Props {
  size: number
  color: string
}

const HeartsIcon: React.FC<Props> = ({ size, color }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 -1 65 65"
      className="SuitIcon"
    >
      <path
        fill="#ffffff"
        stroke={color}
        d="M33 64 Q24 50 12 40 Q1 30.5 1 17 Q1 1 18 1 Q26 1 33 8 Q40 1 48 1 Q65 1 65 17 Q65 30.5 54 40 Q42 50 33 64"
      />
      <path
        stroke={color}
        d="M47 1 L47 46.4 M51 1 L51 42.4 M55 1.7 L55 38.8 M59 3.7 L59 34.7 M63 8 L63 28"
      />
    </svg>
  )
}

export default HeartsIcon
