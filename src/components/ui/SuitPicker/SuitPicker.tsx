import clsx from 'clsx'
import React from 'react'
import '../../../styles/common/picker.css'
import { Suit } from '../../../types'
import AcornsIcon from '../AcornsIcon'
import BellsIcon from '../BellsIcon'
import HeartsIcon from '../HeartsIcon'
import LeavesIcon from '../LeavesIcon'
import './styles.css'

export function getSuitIcon(suit: string, color: string, size: number) {
  switch (suit) {
    case 'hearts':
      return <HeartsIcon color={color} size={size} />
    case 'bells':
      return <BellsIcon color={color} size={size} />
    case 'acorns':
      return <AcornsIcon color={color} size={size} />
    case 'leaves':
      return <LeavesIcon color={color} size={size} />
    default:
      return null
  }
}

interface Props {
  onChange: (suit: Suit) => void
  value?: Suit
  small?: boolean
}

const SuitPicker: React.FC<Props> = ({ value, onChange, small }) => {
  return (
    <div className={clsx('SuitPicker', small && 'SuitPicker--small')}>
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
          {getSuitIcon(val, '#4e565c', small ? 60 : 85)}
        </button>
      ))}
    </div>
  )
}

export default SuitPicker
