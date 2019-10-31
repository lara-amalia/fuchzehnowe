import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { Game, GameInfo, GameStep, Id, Player } from '../../../types'
import { unwrapDocument, unwrapQuery } from '../../../util/data'
import { GameContext } from '../../../util/useGame'
import RoundSetup from './RoundSetup'
import Scoreboard from './Scoreboard'
import GamePlaying from './GamePlaying'

interface Props {
  gameInfo: GameInfo
}

const GameView: React.FC<Props> = ({ gameInfo }) => {
  const [game, setGame] = useState<Game & Id>()
  const [players, setPlayers] = useState<(Player & Id)[]>([])

  useEffect(() => {
    const gameDoc = firebase
      .firestore()
      .collection('games')
      .doc(gameInfo.gameId)

    const unsubscribeArr = [
      gameDoc.onSnapshot(s => setGame(unwrapDocument(s))),
      gameDoc.collection('players').onSnapshot(s => setPlayers(unwrapQuery(s))),
    ]

    return () => unsubscribeArr.forEach(u => u())
  }, [gameInfo.gameId])

  const currentPlayer = players.find(p => p.id === gameInfo.userId)

  if (!game || !currentPlayer) {
    return <p>loading game (id: {gameInfo.gameId})...</p>
  }

  return (
    <GameContext.Provider value={{ game, gameInfo, players, currentPlayer }}>
      {(() => {
        switch (game.step) {
          case GameStep.Scoreboard:
            return <Scoreboard />
          case GameStep.Setup:
            return <RoundSetup />
          case GameStep.Playing:
            return <GamePlaying />
          default:
            return <p>GameView: {gameInfo.gameId}</p>
        }
      })()}
    </GameContext.Provider>
  )
}

export default GameView
