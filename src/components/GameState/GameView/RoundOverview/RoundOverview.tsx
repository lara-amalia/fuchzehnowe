import * as firebase from 'firebase/app'
import React from 'react'
import { Player, Suit } from '../../../../types'
import useGame from '../../../../util/useGame'
import BasicLayout from '../../../ui/BasicLayout'
import Button from '../../../ui/Button'
import './styles.css'
import RoundSummary from '../../../ui/RoundSummary'

export const PLAYING_PLACEHOLDER = -999
const PASS_HEART_TRUMP_POINTS = 2
const PASS_POINTS = 1
const PLAYING_THRESHOLD = 5

const RoundOverview = () => {
  const { game, gameInfo, players, currentPlayer, currentRound } = useGame()
  const currentRoundData = game.rounds[currentRound - 1]
  const currentRoundPlayer = players.find(
    p => p.id === currentRoundData.player,
  )!
  const getCurrentUserPoints = (): number => {
    return currentPlayer.points[currentPlayer.points.length - 1]
  }

  /**
   * Returns the number of players taking part in the current round.
   * They have either not yet decided (points of current round are undefined)
   * or they already decided that they are playing (points of current round are PLAYING_PLACEHOLDER)
   */
  const playersInRound = () => {
    return players.filter(
      p =>
        !p.points[currentRound] ||
        p.points[currentRound] === PLAYING_PLACEHOLDER,
    ).length
  }

  /**
   * Updates the points array of the current user depending
   * on whether they are playing or not.
   * @param decision – true = playing, false = passing
   */
  const onDecide = (decision: boolean) => {
    const newPoints = decision
      ? PLAYING_PLACEHOLDER
      : (() => {
          const currentPoints = getCurrentUserPoints()

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
      <RoundSummary
        name={currentRoundPlayer.name}
        tricks={currentRoundData.tricks}
        trump={currentRoundData.trump}
        itIsYou={currentPlayer.id === currentRoundPlayer.id}
      />
      <div className="RoundOverview-actions">
        <Button onClick={() => onDecide(true)}>Bin dabei</Button>
        <Button
          onClick={() => onDecide(false)}
          disabled={
            currentRoundPlayer.id === gameInfo.userId ||
            getCurrentUserPoints() <= PLAYING_THRESHOLD ||
            playersInRound() <= 2
          }
        >
          Ohne mich
        </Button>
        {getCurrentUserPoints() <= PLAYING_THRESHOLD && (
          <p className="hint-text">
            Du hast nur noch {getCurrentUserPoints()} Punkte, und kannst nicht
            mehr aussteigen...
          </p>
        )}
        {playersInRound() <= 2 && (
          <p className="hint-text">Mindestens 2 Spieler müssen spielen...</p>
        )}
      </div>
    </BasicLayout>
  )
}

export default RoundOverview
