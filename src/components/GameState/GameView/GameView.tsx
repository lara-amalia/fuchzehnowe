import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { Game, GameInfo, GameStep, Id } from '../../../types'
import { unwrapDocument } from '../../../util/data'
import { GameContext } from '../../../util/useGame'
import GameRoundOverview from './RoundOverview'
import GameRoundSetup from './RoundSetup'
import GameScoreboard from './Scoreboard'

interface Props {
  gameInfo: GameInfo
}

const GameView: React.FC<Props> = ({ gameInfo }) => {
  const [game, setGame] = useState<Game & Id>()

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc(gameInfo.gameId)
      .onSnapshot(s => setGame(unwrapDocument(s)))

    return () => unsubscribe()
  }, [gameInfo.gameId])

  if (!game) {
    return <p>loading game (id: {gameInfo.gameId})...</p>
  }

  return (
    <GameContext.Provider value={{ game, gameInfo }}>
      {(() => {
        switch (game.step) {
          case GameStep.Scoreboard:
            return <GameScoreboard />
          case GameStep.Setup:
            return <GameRoundSetup />
          case GameStep.Overview:
            return <GameRoundOverview />
          default:
            return <p>GameView: {gameInfo.gameId}</p>
        }
      })()}
    </GameContext.Provider>
  )
}

export default GameView
