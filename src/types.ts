export enum GameStep {
  Scoreboard = 'scoreboard',
  Setup = 'setup',
  Overview = 'overview',
  Done = 'done',
}

export interface Id {
  id: string
}

export interface Game {
  adminId: string
  rounds: Round[]
  step: GameStep
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

export interface GameInfo {
  gameId: string
  userId: string
}
