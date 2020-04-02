import * as firebase from 'firebase/app'
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

    /*
     * Round is done when every user has entered their points of the current round.
     */
    const roundFinished = !players.find(
      pd =>
        pd.points.length === currentRound ||
        pd.points[game.rounds.length] === PLAYING_PLACEHOLDER,
    )

    if (roundFinished) {
      /*
       * After each round, check if game is over.
       */
      const gameFinished = players.find(
        pd => pd.points[game.rounds.length] <= -1,
      )

      const gameStep = gameFinished
        ? ({
            step: GameStep.Over,
          } as Partial<Game>)
        : ({
            step: GameStep.Scoreboard,
          } as Partial<Game>)

      firebase
        .firestore()
        .collection('games')
        .doc(game.id)
        .update(gameStep)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, players])

  if (currentRound === currentPlayer.points.length) {
    return <RoundOverview />
  }

  return <RoundDone />
}

export default GamePlaying
