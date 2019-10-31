import React, { useState } from 'react'
import GameView from './GameView'
import InitView from './InitView'
import { GameInfo } from '../../types'

const GameState: React.FC = () => {
  const [gameInfo, setGameInfo] = useState<GameInfo>({
    gameId: 'jGlYVQzjlgzzvocK9aiF',
    // userId: 'NNkewQYGcbigZYZ8JZDL', // Momo
    userId: 'QDTpLeNmZztszZDrJJQe', // Lara
  })

  /**
   * 
   * {
    gameId: 'jGlYVQzjlgzzvocK9aiF',
    userId: 'QDTpLeNmZztszZDrJJQe',
  }
   */

  // If there is no running game, return to init screen.
  if (!gameInfo) {
    return <InitView onGameInfoSelect={setGameInfo} />
  }

  return (
    <GameView gameInfo={gameInfo} />
    // <div>
    //   {gameId}
    //   <button onClick={() => setGameId(undefined)}>leave game</button>
    // </div>
  )
}

export default GameState
