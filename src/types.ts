export interface Id {
  id: string
}

export interface Game {
  adminId: string
  currentRound: number
}

export interface Player {
  name: string
  points: number[]
}
