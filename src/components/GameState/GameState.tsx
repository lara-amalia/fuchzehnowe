import React, { useState } from 'react'
import { GameInfo } from '../../types'
import GameView from './GameView'
import InitView from './InitView'

const GameState: React.FC = () => {
  const [gameInfo, setGameInfo] = useState<GameInfo>()

  // If there is no running game, return to init screen.
  if (!gameInfo) {
    return <InitView onGameInfoSelect={setGameInfo} />
  }

  return <GameView gameInfo={gameInfo} />
}

export default GameState
