import clsx from 'clsx'
import React from 'react'
import '../../../styles/common/picker.css'
import { Suit } from '../../../types'
import './styles.css'

interface Props {
  value?: Suit
  onChange: (suit: Suit) => void
}

const SuitPicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="SuitPicker">
      {Object.values(Suit).map(val => (
        <button
          key={val}
          className={clsx(
            'Picker-item',
            'SuitPicker-item',
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

export default SuitPicker
