import React, { useMemo } from 'react'
import { Game, Player } from '../../../types'

interface Props {
  game: Game
  players: Player[]
}

/*
 * [15, 13, 11, 10, 5, 3, -1]
 * [15, 12, 10, 7, 4, 5, 3]
 *
 *
 * [[15, 15], [13, 12], [11, 10], ...]
 * */

const GameStats: React.FC<Props> = ({ game, players }) => {

  const scoreboard = useMemo(() => {
    const result = []
    const rounds = players[0].points.length

    for (let i = 0; i < rounds; i++) {
      result.push(players.map(p => p.points[i]))

    }

    console.log(result)
    return result;
  }, [players])

  return (
    <table>
      <thead>
        <tr>
          {players.map(player => (
            <th key={player.name}>{player.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {scoreboard.map((scores, i1) => (
          <tr key={i1}>
            {scores.map((score, i2) => (
              <td key={i2}>{score}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default GameStats
