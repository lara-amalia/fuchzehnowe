import React from 'react'
import './styles.css'
import { getSuitIcon } from '../SuitPicker'

interface Props {
  name: string
  tricks: number
  trump: string
  itIsYou: boolean
}

const RoundSummary: React.FC<Props> = ({ name, tricks, trump, itIsYou }) => (
  <div>
    {itIsYou ? (
      <>
        <span className="RoundSummary-highlight">Du</span> machst{' '}
      </>
    ) : (
      <>
        {' '}
        <span className="RoundSummary-highlight">{name}</span> macht{' '}
      </>
    )}
    <span className="RoundSummary-highlight">{tricks}</span>{' '}
    {tricks > 1 ? 'Stiche' : 'Stich'}
    <br />
    <span className="RoundSummary-highlight">
      {getSuitIcon(trump, '#23272b', 80)}
    </span>
    <br />
    ist Trumpf
  </div>
)

export default RoundSummary
