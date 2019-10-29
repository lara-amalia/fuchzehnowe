import React from 'react'
import './styles.css'
import { Suit } from '../../../types'
import clsx from 'clsx'

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
            'SuitPicker-item',
            value === val && 'SuitPicker-item--selected',
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
