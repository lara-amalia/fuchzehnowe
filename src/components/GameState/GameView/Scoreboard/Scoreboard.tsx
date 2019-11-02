import clsx from 'clsx'
import firebase from 'firebase'
import React from 'react'
import { Game, GameStep } from '../../../../types'
import useGame from '../../../../util/useGame'
import Button from '../../../ui/Button'
import Header from '../../../ui/Header'
import { getSuitIcon } from '../../../ui/SuitPicker'
import './styles.css'
import QuitButton from '../../../ui/QuitButton'

const transformShortcut = (shortcut: string) => {
  return shortcut.split('-').map(s => getSuitIcon(s, '#23272b', 60))
}

const Scoreboard = () => {
  const { game, gameInfo, players, currentPlayer, currentRound } = useGame()

  const startNextRound = () => {
    firebase
      .firestore()
      .collection('games')
      .doc(gameInfo.gameId)
      .update({
        step: GameStep.Setup,
        shortcut: null,
      } as Partial<Game>)
  }

  const quitGame = () => {
    console.log('quit!')
  }

  return (
    <>
      <Header
        userName={currentPlayer.name}
        leftItem={<QuitButton onClick={quitGame} />}
      />
      <div className="Scoreboard">
        <div className="Scoreboard-title">
          <h1>Punktestand</h1>
          {game.shortcut && (
            <div>
              {transformShortcut(game.shortcut)}
              <p className="hint-text">Der Schlüssel zum Spiel ;-)</p>
            </div>
          )}
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
            <Button onClick={startNextRound} disabled={players.length < 2}>
              Runde {currentRound + 1} starten
            </Button>
            {players.length < 2 && (
              <p className="hint-text">
                Alleine spielen ist doch langweilig...
              </p>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Scoreboard
