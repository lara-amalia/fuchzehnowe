import * as firebase from 'firebase/app'
import React, { useEffect, useState } from 'react'
import { Game, GameInfo, GameStep, Id, Player } from '../../../types'
import { unwrapDocument, unwrapQuery } from '../../../util/data'
import { GameContext } from '../../../util/useGame'
import BasicLayout from '../../ui/BasicLayout'
import GamePlaying from './GamePlaying'
import RoundSetup from './RoundSetup'
import Scoreboard from './Scoreboard'
import { LOCAL_STORAGE_KEY } from '../GameState'

interface Props {
  gameInfo: GameInfo
  setGameInfo: (gameInfo?: GameInfo) => void
}

const GameView: React.FC<Props> = ({ gameInfo, setGameInfo }) => {
  const [game, setGame] = useState<Game & Id>()
  const [players, setPlayers] = useState<(Player & Id)[]>([])

  const currentPlayer = players.find(p => p.id === gameInfo.userId)

  useEffect(() => {
    const gameDoc = firebase
      .firestore()
      .collection('games')
      .doc(gameInfo.gameId)

    const unsubscribeArr = [
      gameDoc.onSnapshot(s => {
        const gameData = unwrapDocument<Game>(s)

        if (!gameData) {
          window.localStorage.removeItem(LOCAL_STORAGE_KEY)
          setGameInfo(undefined)
        }

        setGame(gameData)
      }),
      gameDoc.collection('players').onSnapshot(s => {
        const playerData = unwrapQuery<Player>(s)

        if (!playerData.find(p => p.id === gameInfo.userId)) {
          window.localStorage.removeItem(LOCAL_STORAGE_KEY)
          setGameInfo(undefined)
        }

        setPlayers(playerData)
      }),
    ]

    return () => unsubscribeArr.forEach(u => u())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameInfo.gameId])

  if (!game || !currentPlayer) {
    return (
      <BasicLayout title="Loading...">
        <p>Spiel wird geladen.</p>
        <p className="hint-text">
          Game ID: {gameInfo.gameId}
          <br />
          Player ID: {gameInfo.userId}
        </p>
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
