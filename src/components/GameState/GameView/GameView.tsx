import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { Game, GameInfo, GameStep, Id } from '../../../types'
import { unwrapDocument } from '../../../util/data'
import { GameContext } from '../../../util/useGame'
import RoundOverview from './RoundOverview'
import RoundSetup from './RoundSetup'
import Scoreboard from './Scoreboard'
import RoundDone from './RoundDone'

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
            return <Scoreboard />
          case GameStep.Setup:
            return <RoundSetup />
          case GameStep.Overview:
            return <RoundOverview />
          case GameStep.Done:
            return <RoundDone />
          default:
            return <p>GameView: {gameInfo.gameId}</p>
        }
      })()}
    </GameContext.Provider>
  )
}

export default GameView
