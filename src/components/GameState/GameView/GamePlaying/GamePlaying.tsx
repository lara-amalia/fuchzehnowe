import firebase from 'firebase'
import React, { useEffect } from 'react'
import { Game, GameStep } from '../../../../types'
import useGame from '../../../../util/useGame'
import RoundDone from '../RoundDone'
import RoundOverview, { PLAYING_PLACEHOLDER } from '../RoundOverview'

const GamePlaying = () => {
  const { game, players, currentPlayer, currentRound } = useGame()

  useEffect(() => {
    if (
      !currentPlayer ||
      !game ||
      currentPlayer.id !== game.adminId ||
      game.step !== GameStep.Playing
    ) {
      return
    }

    const roundFinished = !players.find(
      pd =>
        pd.points.length === currentRound ||
        pd.points[game.rounds.length] === PLAYING_PLACEHOLDER,
    )

    if (roundFinished) {
      firebase
        .firestore()
        .collection('games')
        .doc(game.id)
        .update({
          step: GameStep.Scoreboard,
        } as Partial<Game>)
    }
  }, [game, players, currentPlayer, currentRound])

  if (currentRound === currentPlayer.points.length) {
    return <RoundOverview />
  }

  return <RoundDone />
}

export default GamePlaying
