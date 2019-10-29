import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { Game, GameStep, Id, Player } from '../../../../types'
import { unwrapQuery } from '../../../../util/data'
import useGame from '../../../../util/useGame'
import Button from '../../../ui/Button'
import Header from '../../../ui/Header'
import './styles.css'

const GameScoreboard = () => {
  const { game, gameInfo } = useGame()
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
        step: GameStep.Setup,
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
