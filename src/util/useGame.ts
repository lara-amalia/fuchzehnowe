import { createContext, useContext } from 'react'
import { GameInfo, Game, GameStep, Player, Id } from '../types'

export interface GameContext {
  game: Game & Id
  players: (Player & Id)[]
  gameInfo: GameInfo
}

export const GameContext = createContext<GameContext>({
  game: {
    id: '',
    adminId: '',
    step: GameStep.Scoreboard,
    rounds: [],
  },
  gameInfo: {
    gameId: '',
    userId: '',
  },
  players: [],
})

export default () => useContext(GameContext)
