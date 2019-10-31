import clsx from 'clsx'
import firebase from 'firebase'
import React from 'react'
import { Game, GameStep } from '../../../../types'
import useGame from '../../../../util/useGame'
import Button from '../../../ui/Button'
import Header from '../../../ui/Header'
import './styles.css'

const Scoreboard = () => {
  const { game, gameInfo, players, currentPlayer } = useGame()

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
      <Header userName={currentPlayer.name} />
      <div className="Scoreboard">
        <div className="Scoreboard-title">
          <h1>Punktestand</h1>
          <p>Scoreboard of Game: {gameInfo.gameId}</p>
        </div>
        <div className="Scoreboard-playerlist">
          {players
            .sort((a, b) => {
              return (
                a.points[a.points.length - 1] - b.points[b.points.length - 1]
              )
            })
            .map(player => (
              <p
                key={player.id}
                className={clsx(
                  'Scoreboard-player',
                  player.id === gameInfo.userId && 'Scoreboard-player--me',
                )}
              >
                <span className="Player-name">{player.name}</span>
                <span className="Player-points">
                  {player.points[player.points.length - 1]}
                </span>
              </p>
            ))}
        </div>
        {game.adminId === gameInfo.userId && game.step === GameStep.Scoreboard && (
          <div className="Scoreboard-actions">
            <Button onClick={startNextRound}>Runde starten</Button>
          </div>
        )}
      </div>
    </>
  )
}

export default Scoreboard
