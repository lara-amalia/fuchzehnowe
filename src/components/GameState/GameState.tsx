import React, { useState } from 'react'
import { GameInfo } from '../../types'
import GameView from './GameView'
import InitView from './InitView'

export const LOCAL_STORAGE_KEY = 'fuchzehnowe'

const GameState: React.FC = () => {
  const [gameInfo, setGameInfo] = useState<GameInfo>()

  const initGameInfo = (gameInfo: GameInfo) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameInfo))
    setGameInfo(gameInfo)
  }

  // If there is no running game, return to init screen.
  if (!gameInfo) {
    return <InitView onGameInfoSelect={initGameInfo} />
  }

  return <GameView gameInfo={gameInfo} setGameInfo={setGameInfo} />
}

export default GameState
