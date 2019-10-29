import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { GameInfo } from '../../GameState'
import { Game, Id, Player } from '../../../../types'
import Header from '../../../ui/Header'
import './styles.css'
import Button from '../../../ui/Button'
import { unwrapQuery } from '../../../../util/data'

interface Props {
  gameInfo: GameInfo
  game: Game
}

const GameScoreboard: React.FC<Props> = ({ gameInfo, game }) => {
  const [players, setPlayers] = useState<(Player & Id)[]>()

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc(gameInfo.gameId)
      .collection('players')
      .onSnapshot(s => setPlayers(unwrapQuery(s)))

    return () => unsubscribe()
  }, [gameInfo.gameId])

  const startNextRound = () => {
    firebase
      .firestore()
      .collection('games')
      .doc(gameInfo.gameId)
      .update({
        currentRound: game.currentRound + 1,
      } as Partial<Game>)
  }

  return (
    <>
      <Header />
      <div className="GameScoreboard">
        <div className="GameScoreboard-title">
          <h1>Punktestand</h1>
          <p>Scoreboard of Game: {gameInfo.gameId}</p>
        </div>
        <div className="GameScoreboard-playerlist">
          {players ? (
            players.map(player => (
              <p key={player.id} className="GameScoreboard-player">
                <span className="Player-name">{player.name}</span>
                <span className="Player-points">{player.points[0]}</span>
              </p>
            ))
          ) : (
            <p>no players</p>
          )}
        </div>
        {game.adminId === gameInfo.userId && (
          <div className="GameScoreboard-actions">
            <Button onClick={startNextRound}>Runde starten</Button>
          </div>
        )}
      </div>
    </>
  )
}

export default GameScoreboard
