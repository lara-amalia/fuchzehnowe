import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { Game, GameInfo, GameStep, Id, Player } from '../../../types'
import { unwrapDocument, unwrapQuery } from '../../../util/data'
import { GameContext } from '../../../util/useGame'
import BasicLayout from '../../ui/BasicLayout'
import GamePlaying from './GamePlaying'
import RoundSetup from './RoundSetup'
import Scoreboard from './Scoreboard'

interface Props {
  gameInfo: GameInfo
}

const GameView: React.FC<Props> = ({ gameInfo }) => {
  const [game, setGame] = useState<Game & Id>()
  const [players, setPlayers] = useState<(Player & Id)[]>([])

  const currentPlayer = players.find(p => p.id === gameInfo.userId)

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

  if (!game || !currentPlayer) {
    return (
      <BasicLayout title="Loading...">
        Loading game (ID: {gameInfo.gameId})...
      </BasicLayout>
    )
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
            return (
              <BasicLayout title="Unknown game state">
                Game ID: {gameInfo.gameId}
                <br />
                Player ID: {gameInfo.userId}
              </BasicLayout>
            )
        }
      })()}
    </GameContext.Provider>
  )
}

export default GameView
