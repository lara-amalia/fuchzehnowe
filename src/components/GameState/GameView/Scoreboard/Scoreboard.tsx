import clsx from 'clsx'
import firebase from 'firebase'
import React, { cloneElement } from 'react'
import { Game, GameStep } from '../../../../types'
import useGame from '../../../../util/useGame'
import Button from '../../../ui/Button'
import Header from '../../../ui/Header'
import QuitButton from '../../../ui/QuitButton'
import { getSuitIcon } from '../../../ui/SuitPicker'
import './styles.css'

const transformShortcut = (shortcut: string) => {
  return shortcut
    .split('-')
    .map((s, idx) =>
      cloneElement(getSuitIcon(s, '#23272b', 60)!, { key: s + idx }),
    )
}

const Scoreboard = () => {
  const { game, gameInfo, players, currentPlayer, currentRound } = useGame()

  const gamesDoc = firebase
    .firestore()
    .collection('games')
    .doc(gameInfo.gameId)

  const startNextRound = () =>
    gamesDoc.update({
      step: GameStep.Setup,
      shortcut: null,
    } as Partial<Game>)

  const quitGame = async () => {
    if (gameInfo.userId === game.adminId || players.length === 2) {
      if (
        window.confirm(
          'Willst du das Spiel wirklich beenden? (Der gesamte Spielstand und alle Spieler werden dabei gelöscht.)',
        )
      ) {
        await Promise.all([
          ...players.map(({ id }) =>
            gamesDoc
              .collection('players')
              .doc(id)
              .delete(),
          ),
          gamesDoc.delete(),
        ])
      }
    } else {
      if (
        window.confirm(
          'Willst du das Spiel wirklich verlassen? (Du kannst nicht mehr beim laufenden Spiel mitspielen.)',
        )
      ) {
        await gamesDoc
          .collection('players')
          .doc(gameInfo.userId)
          .delete()
      }
    }
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
              <div
                key={player.id}
                className={clsx(
                  'Scoreboard-player',
                  player.id === gameInfo.userId && 'Scoreboard-player--me',
                )}
              >
                <span className="Player-name">{player.name}</span>
                <div className="Player-points">
                  {currentRound > 1 && (
                    <span className="Player-prev-points">
                      {player.points[player.points.length - 2]}
                    </span>
                  )}
                  <span className="Player-current-points">
                    {player.points[player.points.length - 1]}
                  </span>
                </div>
              </div>
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
