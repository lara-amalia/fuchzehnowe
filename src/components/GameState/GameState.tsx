import React, { useState } from 'react'
import { GameInfo } from '../../types'
import { LOCAL_STORAGE_KEY } from '../../util/constants'
import { storeGameIdToLocalStorage } from '../../util/storeGameIds'
import GameView from './GameView'
import InitView from './InitView'

const GameState: React.FC = () => {
  const [gameInfo, setGameInfo] = useState<GameInfo>()

  const initGameInfo = (gameInfo: GameInfo) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameInfo))
    storeGameIdToLocalStorage(gameInfo.gameId)
    setGameInfo(gameInfo)
  }

  // If there is no running game, return to init screen.
  if (!gameInfo) {
    return <InitView onGameInfoSelect={initGameInfo} />
  }

  return <GameView gameInfo={gameInfo} setGameInfo={setGameInfo} />
}

export default GameState
