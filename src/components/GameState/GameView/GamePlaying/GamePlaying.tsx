import React from 'react'
import useGame from '../../../../util/useGame'
import RoundOverview from '../RoundOverview'
import RoundDone from '../RoundDone'

const GamePlaying = () => {
  const { currentPlayer, currentRound } = useGame()

  if (currentRound === currentPlayer.points.length) {
    return <RoundOverview />
  }

  return <RoundDone />
}

export default GamePlaying
