import * as firebase from 'firebase/app'
import React from 'react'
import { LOCAL_STORAGE_KEY } from '../../../../util/constants'
import BasicLayout from '../../../ui/BasicLayout'
import useGame from '../../../../util/useGame'
import { Game, GameInfo } from '../../../../types'
import Button from '../../../ui/Button'
import './styles.css'

interface Props {
  setGameInfo: (gameInfo?: GameInfo) => void
}

const GameOver: React.FC<Props> = ({ setGameInfo }) => {
  const { game, gameInfo, currentPlayer, players } = useGame()

  const winners = players.filter(p => p.points && p.points[p.points.length - 1] <= -1)

  const endGame = () => {
    if (
      window.confirm(
        'Willst du das Spiel wirklich beenden?',
      )
    ) {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY)
      setGameInfo(undefined)
      firebase
        .firestore()
        .collection('games')
        .doc(gameInfo.gameId)
        .update({
          gameOver: true,
        } as Partial<Game>)
    }
  }

  return (
    <BasicLayout title="Spiel vorbei" userName={currentPlayer.name}>
      <p>
        {winners.length > 1 ? <>Die Gewinner sind:</> : <>Der Gewinner ist:</>}{' '}
        <br />
        <span className="GameOver-winners">
          {winners.map(w => w.name).join(',')}
        </span>
      </p>
      <p>
        Es wurden{' '}
        <strong className="GameOver-rounds">{game.rounds.length}</strong> Runden
        gespielt.
      </p>
      <div className="GameOver-scoreboard">
        <h2>Punkteliste</h2>
        <ol>
          {players
            .sort(
              (a, b) =>
                a.points[a.points.length - 1] - b.points[b.points.length - 1],
            )
            .map(p => (
              <li
                key={p.id}
                className={
                  p.id === currentPlayer.id ? 'GameOver-player-me' : ''
                }
              >
                {p.name}, {p.points[p.points.length - 1]}
              </li>
            ))}
        </ol>
      </div>
      {game.adminId === gameInfo.userId && <Button onClick={endGame}>Spiel beenden</Button>}
    </BasicLayout>
  )
}

export default GameOver
