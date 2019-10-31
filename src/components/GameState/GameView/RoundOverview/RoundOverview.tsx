import firebase from 'firebase'
import React from 'react'
import { Player, Suit } from '../../../../types'
import useGame from '../../../../util/useGame'
import BasicLayout from '../../../ui/BasicLayout'
import Button from '../../../ui/Button'
import './styles.css'

const PLAYING_PLACEHOLDER = -1
const PASS_HEART_TRUMP_POINTS = 2
const PASS_POINTS = 1

const RoundOverview = () => {
  const { game, gameInfo, players, currentPlayer, currentRound } = useGame()
  const currentRoundData = game.rounds[currentRound - 1]
  const currentRoundPlayer = players.find(
    p => p.id === currentRoundData.player,
  )!

  const onDecide = (decision: boolean) => {
    const newPoints = decision
      ? PLAYING_PLACEHOLDER
      : (() => {
          const currentPoints =
            currentPlayer.points[currentPlayer.points.length - 1]
          const delta =
            game.rounds[game.rounds.length - 1].trump === Suit.Hearts
              ? PASS_HEART_TRUMP_POINTS
              : PASS_POINTS
          return currentPoints + delta
        })()

    firebase
      .firestore()
      .collection('games')
      .doc(gameInfo.gameId)
      .collection('players')
      .doc(gameInfo.userId)
      .update({
        points: [...currentPlayer.points, newPoints],
      } as Partial<Player>)
  }

  return (
    <BasicLayout title={`Runde #${currentRound}`} userName={currentPlayer.name}>
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
        <Button onClick={() => onDecide(true)}>Bin dabei</Button>
        <Button
          onClick={() => onDecide(false)}
          disabled={currentRoundPlayer.id === gameInfo.userId}
        >
          Ohne mich
        </Button>
      </div>
    </BasicLayout>
  )
}

export default RoundOverview

// disable ohne mich button when: 5 points or less, you're the currentroundplayer
