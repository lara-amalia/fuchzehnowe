import * as firebase from 'firebase/app'
import toPairs from 'lodash/toPairs'
import React, { useEffect, useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import { Game, Id, Player, Suit } from '../../types'
import { CHART_COLORS } from '../../util/constants'
import BasicLayout from '../ui/BasicLayout'
import { getSuitIcon } from '../ui/SuitPicker'
import './styles.css'

interface PlayerStat {
  name: string
  lost: number
  roundAdmin: number
  tricks: number
}

interface GameStats {
  roundsTotal: number
  trumpCount: Map<string, number>
}

const GameStats: React.FC = () => {
  const { gameId } = useParams()
  const [game, setGame] = useState<Game>()
  const [players, setPlayers] = useState<(Player & Id)[]>()

  useEffect(() => {
    async function fetchGame() {
      const gameDoc = firebase.firestore().collection('games').doc(gameId)

      const [gameSnapshot, playersSnapshot] = await Promise.all([
        gameDoc.get(),
        gameDoc.collection('players').get(),
      ])

      if (!gameSnapshot.exists) {
        return
      }

      setGame(gameSnapshot.data() as Game)
      setPlayers(
        playersSnapshot.docs.map(
          (d) => ({ ...d.data(), id: d.id } as Player & Id),
        ),
      )
    }

    fetchGame()
  }, [gameId])

  const playersStats: PlayerStat[] = useMemo(() => {
    return (players ?? []).map((player) => {
      let lostCount = 0
      let adminCount = 0
      let tricksTotal = 0
      const pointsWithInitial = player.points.length
      const rounds = game?.rounds.length || 0

      for (let i = 1; i < pointsWithInitial; i++) {
        lostCount =
          player.points[i] > player.points[i - 1] ? lostCount + 1 : lostCount
      }

      for (let i = 0; i < rounds; i++) {
        const trump = game?.rounds[i].trump
        // Calculate the score difference when the player didn't lose the round
        const scoreDifference =
          player.points[i] < player.points[i + 1]
            ? 0
            : player.points[i] - player.points[i + 1]
        adminCount =
          game?.rounds[i].player === player.id ? adminCount + 1 : adminCount
        // Points count double when Hearts is trump
        tricksTotal =
          trump === Suit.Hearts
            ? tricksTotal + scoreDifference / 2
            : tricksTotal + scoreDifference
      }

      return {
        name: player.name,
        lost: lostCount,
        roundAdmin: adminCount,
        tricks: tricksTotal,
      }
    })
  }, [players, game])

  const gameStats: GameStats = useMemo(() => {
    if (!game) {
      return {
        roundsTotal: 0,
        trumpCount: new Map<string, number>(),
      }
    }

    const trumpCounts = new Map<string, number>()
    for (const round of game.rounds) {
      const trump = round.trump
      const currentValue = trumpCounts.get(trump)
      const newValue = currentValue ? currentValue + 1 : 1
      trumpCounts.set(trump, newValue)
    }

    return {
      roundsTotal: game!.rounds.length,
      trumpCount: trumpCounts,
    }
  }, [game])

  if (!game || !players) {
    return <p>loading stats...</p>
  }

  return (
    <BasicLayout title="Spiel Statistiken" alignment="left">
      <div className="statsContent">
        <div className="statsContent-centered">
          <p>gameID: {gameId} chart?</p>
          <h2>Das Spiel</h2>
          <h3>Gespielte Runden</h3>
          <p>{gameStats.roundsTotal}</p>
          <h3>Trumpf-Statistiken</h3>
          <div className="statsContent-trumps">
            {toPairs(gameStats.trumpCount).map(([key, value]) => {
              return (
                <div key={key}>
                  {getSuitIcon(key, '#4e565c', 60)}
                  <p>{value}</p>
                </div>
              )
            })}
          </div>
          <div className="statsContent-lineChart">
            <Line
              data={{
                labels: Array.from(players[0].points.keys()),
                datasets: players.map((player, index) => ({
                  label: player.name,
                  data: player.points,
                  fill: false,
                  borderColor: CHART_COLORS[index],
                })),
              }}
              legend={{
                labels: {
                  fontColor: '#ffffff',
                },
              }}
            />
          </div>
        </div>
        <div className="statsContent-left">
          <h2>Die Spieler</h2>
          <h3>Punktestand nach der letzten Runde</h3>
          <ol>
            {players
              .sort(
                (a, b) =>
                  a.points[a.points.length - 1] - b.points[b.points.length - 1],
              )
              .map((player) => (
                <li key={player.name}>
                  {player.name}: {player.points[player.points.length - 1]}
                </li>
              ))}
          </ol>
          <h3>Gefallen</h3>
          <ol>
            {playersStats
              .sort((a, b) => b.lost - a.lost)
              .map((player) => (
                <li key={player.name}>
                  {player.name}: {player.lost}
                </li>
              ))}
          </ol>
          <h3>Stich ångsågt</h3>
          <ol>
            {playersStats
              .sort((a, b) => b.roundAdmin - a.roundAdmin)
              .map((player) => (
                <li key={player.name}>
                  {player.name}: {player.roundAdmin}
                </li>
              ))}
          </ol>
          <h3>Stiche gesamt</h3>
          <ol>
            {playersStats
              .sort((a, b) => b.tricks - a.tricks)
              .map((player) => (
                <li key={player.name}>
                  {player.name}: {player.tricks}
                </li>
              ))}
          </ol>
        </div>
      </div>
    </BasicLayout>
  )
}

export default GameStats
