import firebase from 'firebase'
import React, { useEffect, useState, useRef } from 'react'
import { Game, Id } from '../../../types'
import { GameInfo } from '../GameState'
import GameScoreboard from './Scoreboard'
import { unwrapDocument } from '../../../util/data'
import GameRoundOverview from './RoundOverview'

enum GameState {
  Scoreboard,
  RoundSetup,
  RoundOverview,
  RoundDone,
}

interface Props {
  gameInfo: GameInfo
}

const GameView: React.FC<Props> = ({ gameInfo }) => {
  const [game, setGame] = useState<Game & Id>()
  const [gameState, setGameState] = useState<GameState>(GameState.Scoreboard)
  const currentRound = useRef(0)

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc(gameInfo.gameId)
      .onSnapshot(s => {
        const gameData = unwrapDocument<Game>(s)
        setGame(gameData)
        if (!gameData) {
          return
        }
        if (gameData.currentRound > currentRound.current) {
          setGameState(GameState.RoundOverview)
          currentRound.current = gameData.currentRound
        }
      })

    return () => unsubscribe()
  }, [gameInfo.gameId])

  if (!game) {
    return <p>loading game (id: {gameInfo.gameId})...</p>
  }

  switch (gameState) {
    case GameState.Scoreboard:
      return <GameScoreboard gameInfo={gameInfo} game={game} />
    case GameState.RoundOverview:
      return <GameRoundOverview gameInfo={gameInfo} game={game} />
    default:
      return <p>GameView: {gameInfo.gameId}</p>
  }
}

export default GameView
