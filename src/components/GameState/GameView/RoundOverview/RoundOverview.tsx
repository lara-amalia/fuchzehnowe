import React from 'react'
import useGame from '../../../../util/useGame'
import BasicLayout from '../../../ui/BasicLayout'
import Button from '../../../ui/Button'
import './styles.css'

const RoundOverview = () => {
  const { game, gameInfo, players } = useGame()
  const currentRound = game.rounds.length
  const currentRoundData = game.rounds[currentRound - 1]
  const currentRoundPlayer = players.find(p => p.id === currentRoundData.player)

  if (!currentRoundPlayer) {
    return null
  }

  return (
    <BasicLayout title={`Runde #${currentRound}`}>
      <p>
        <span className="RoundOverview-highlight">
          {currentRoundPlayer.name}
        </span>
        <br />
        macht{' '}
        <span className="RoundOverview-highlight">
          {currentRoundData.tricks}
        </span>{' '}
        {currentRoundData.tricks > 1 ? 'Stiche' : 'Stich'}
        <br />
        <br />
        <span className="RoundOverview-highlight">
          {currentRoundData.trump}
        </span>
        <br />
        ist Trumpf
      </p>
      <div className="RoundOverview-actions">
        <Button>Bin dabei</Button>
        <Button disabled={currentRoundPlayer.id === gameInfo.userId}>
          Ohne mich
        </Button>
      </div>
    </BasicLayout>
  )
}

export default RoundOverview

// disable ohne mich button when: 5 points or less, you're the currentroundplayer
