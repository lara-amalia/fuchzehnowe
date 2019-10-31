import clsx from 'clsx'
import React from 'react'
import '../../../styles/common/picker.css'
import './styles.css'

interface Props {
  minZero?: boolean
  value?: number
  onChange: (tricks: number) => void
}

const TrickPicker: React.FC<Props> = ({ onChange, value, minZero = false }) => {
  const tricks = minZero ? [0, 1, 2, 3, 4, 5] : [1, 2, 3, 4, 5]
  return (
    <div className="TrickPicker">
      {tricks.map(val => (
        <button
          key={val}
          className={clsx(
            'Picker-item',
            'TrickPicker-item',
            value === val && 'Picker-item--selected',
          )}
          onClick={() => onChange(val)}
        >
          {val}
        </button>
      ))}
    </div>
  )
}

export default TrickPicker
