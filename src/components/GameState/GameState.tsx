import React, { useState } from 'react'
import { GameInfo } from '../../types'
import { storeGameIdToLocalStorage } from '../../util/handleGameIdsInLocalStorage'
import GameView from './GameView'
import InitView from './InitView'

const GameState: React.FC = () => {
  const [gameInfo, setGameInfo] = useState<GameInfo>()

  const initGameInfo = (gameInfo: GameInfo) => {
    storeGameIdToLocalStorage(gameInfo)
    setGameInfo(gameInfo)
  }

  // If there is no running game, return to init screen.
  if (!gameInfo) {
    return <InitView onGameInfoSelect={initGameInfo} />
  }

  return <GameView gameInfo={gameInfo} setGameInfo={setGameInfo} />
}

export default GameState
