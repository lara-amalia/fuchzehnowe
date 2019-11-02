import React from 'react'

interface Props {
  size: number
  color: string
}

const LeavesIcon: React.FC<Props> = ({ size, color }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="-3 0 73 73"
      className="SuitIcon"
    >
      <path
        fill="#ffffff"
        stroke={color}
        d="M35 54 Q34 64 28 68 Q25 69 24 72 Q22 69 25 66 Q33 60 30 54"
      />
      <path
        fill="#ffffff"
        stroke={color}
        d="M33 1 Q24 14 12 24 Q1 33.5 1 47 Q1 63 18 63 Q26 63 33 56 Q40 63 48 63 Q65 63 65 47 Q65 33.5 54 24 Q42 14 33 1"
      />
      <path
        stroke={color}
        d="M47 18 L47 63 M51 21.5 L51 63 M55 25.2 L55 62.2 M59 29.3 L59 60.3 M63 37 L63 55.5"
      />
      <path
        fill="none"
        stroke={color}
        d="M28 18 Q38 25 46 21 M38 18 Q28 25 20 21 M27 22.5 Q23 22.5 19 25 M39 22.5 Q43 22.5 47 25"
      />
      <path
        transform="translate(-23,12) scale(1.7,1)"
        fill="none"
        stroke={color}
        d="M28 18 Q38 25 46 21 M38 18 Q28 25 20 21 M27 22.5 Q23 22.5 19 25 M39 22.5 Q43 22.5 47 25"
      />
      <path
        transform="translate(-33,24) scale(2,1)"
        fill="none"
        stroke={color}
        d="M28 18 Q38 25 46 21 M38 18 Q28 25 20 21 M27 22.5 Q23 22.5 19 25 M39 22.5 Q43 22.5 47 25"
      />
    </svg>
  )
}

export default LeavesIcon
