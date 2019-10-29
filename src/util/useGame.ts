import { createContext, useContext } from 'react'
import { GameInfo, Game, GameStep } from '../types'

export interface GameContext {
  game: Game
  gameInfo: GameInfo
}

export const GameContext = createContext<GameContext>({
  game: {
    adminId: '',
    step: GameStep.Scoreboard,
    rounds: [],
  },
  gameInfo: {
    gameId: '',
    userId: '',
  },
})

export default () => useContext(GameContext)
