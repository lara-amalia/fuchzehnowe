import * as firebase from 'firebase/app'
import React, { useEffect, useState } from 'react'
import { Game, GameInfo, GameStep, Id, Player } from '../../../types'
import { unwrapDocument, unwrapQuery } from '../../../util/data'
import { removeGameFromLocalStorage } from '../../../util/handleGameIdsInLocalStorage'
import { GameContext } from '../../../util/useGame'
import BasicLayout from '../../ui/BasicLayout'
import GameOver from './GameOver'
import GamePlaying from './GamePlaying'
import RoundSetup from './RoundSetup'
import Scoreboard from './Scoreboard'

interface Props {
  gameInfo: GameInfo
  setGameInfo: (gameInfo?: GameInfo) => void
}

const GameView: React.FC<Props> = ({ gameInfo, setGameInfo }) => {
  const [game, setGame] = useState<Game & Id>()
  const [players, setPlayers] = useState<(Player & Id)[]>([])

  const currentPlayer = players.find((p) => p.id === gameInfo.userId)

  useEffect(() => {
    const gameDoc = firebase
      .firestore()
      .collection('games')
      .doc(gameInfo.gameId)

    const unsubscribeArr = [
      gameDoc.onSnapshot((s) => {
        const gameData = unwrapDocument<Game>(s)

        if (!gameData || gameData.gameOver) {
          removeGameFromLocalStorage(gameInfo.gameId)
          setGameInfo(undefined)
        }

        setGame(gameData)
      }),
      gameDoc.collection('players').onSnapshot((s) => {
        const playerData = unwrapQuery<Player>(s)

        if (!playerData.find((p) => p.id === gameInfo.userId)) {
          removeGameFromLocalStorage(gameInfo.gameId)
          setGameInfo(undefined)
        }

        setPlayers(playerData)
      }),
    ]

    return () => unsubscribeArr.forEach((u) => u())
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
          case GameStep.Over:
            return <GameOver setGameInfo={setGameInfo} />
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
