import clsx from 'clsx'
import range from 'lodash/range'
import React from 'react'
import { Suit } from '../../../types'
import {
  SHORTCUT_LENGTH,
  SHORTCUT_SEPARATOR,
} from '../../GameState/InitView/InitNew'
import SuitPicker, { getSuitIcon } from '../SuitPicker'
import './styles.css'

interface Props {
  onChange: (suits: Suit[]) => void
  value: Suit[]
}

export const gameShortcutToString = (input: Suit[]) =>
  input.join(SHORTCUT_SEPARATOR)

const GameShortcutSelect: React.FC<Props> = ({ value, onChange }) => {
  const onSuitSelect = (suit: Suit) =>
    onChange(value.length === SHORTCUT_LENGTH ? [suit] : [...value, suit])

  return (
    <>
      <SuitPicker onChange={onSuitSelect} small />
      <div className="SuitSelection">
        {range(SHORTCUT_LENGTH).map(i =>
          value[i] ? (
            <div key={i} className="SuitSelection-item">
              {getSuitIcon(value[i], '#4e565c', 50)}
            </div>
          ) : (
            <div
              key={i}
              className={clsx(
                'SuitSelection-item',
                'SuitSelection-item--empty',
                (i === 0 || !!value[i - 1]) && 'SuitSelection-item--firstempty',
              )}
            >
              &nbsp;
            </div>
          ),
        )}
      </div>
    </>
  )
}

export default GameShortcutSelect
