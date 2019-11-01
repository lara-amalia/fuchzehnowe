import { createContext, useContext } from 'react'
import { GameInfo, Game, GameStep, Player, Id } from '../types'

export interface GameContext {
  game: Game & Id
  players: (Player & Id)[]
  gameInfo: GameInfo
  currentPlayer: Player & Id
}

export const GameContext = createContext<GameContext>({
  game: {
    id: '',
    adminId: '',
    step: GameStep.Scoreboard,
    rounds: [],
    shortcut: null,
  },
  gameInfo: {
    gameId: '',
    userId: '',
  },
  players: [],
  currentPlayer: {
    id: '',
    name: '',
    points: [],
  },
})

export default () => {
  const ctx = useContext(GameContext)
  const { game } = ctx

  const currentRound = game.rounds.length

  return {
    ...ctx,
    currentRound,
  }
}
