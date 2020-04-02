export interface GameInfo {
  gameId: string
  userId: string
}

export interface Id {
  id: string
}

export interface Game {
  adminId: string
  rounds: Round[]
  step: GameStep
  shortcut: string | null
  gameOver: boolean
}

export interface Player {
  name: string
  points: number[]
}

export interface Round {
  trump: string
  player: string
  tricks: number
}

export enum GameStep {
  Scoreboard = 'scoreboard',
  Setup = 'setup',
  Playing = 'playing',
  Over = 'over',
}

export enum Suit {
  Hearts = 'hearts',
  Bells = 'bells',
  Acorns = 'acorns',
  Leaves = 'leaves',
}
