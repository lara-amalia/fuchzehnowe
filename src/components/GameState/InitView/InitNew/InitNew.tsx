import firebase from 'firebase'
import React, { useRef } from 'react'
import { Game, Player, GameStep, GameInfo } from '../../../../types'
import Header from '../../../ui/Header'
import './styles.css'
import InitLayout from '../../../ui/InitLayout'

interface Props {
  onCreation: (gameInfo: GameInfo) => void
}

/**
 * Start a new game by adding a new game collection and add the first (admin) player.
 */
const InitNew: React.FC<Props> = ({ onCreation }) => {
  const userNameInput = useRef<HTMLInputElement>(null)

  const createGame = async (e: React.FormEvent) => {
    e.preventDefault()

    const gamesCollection = firebase.firestore().collection('games')
    const adminId = gamesCollection.doc().id
    const gameId = gamesCollection.doc().id

    await Promise.all([
      gamesCollection.doc(gameId).set({
        adminId,
        step: GameStep.Scoreboard,
      } as Game),
      gamesCollection
        .doc(gameId)
        .collection('players')
        .doc(adminId)
        .set({
          name: userNameInput.current!.value,
          points: [15],
        } as Player),
    ])

    onCreation({ gameId, userId: adminId })
  }
  return (
    <InitLayout>
      <h1>Neues Spiel</h1>
      <p>Gib deinen Namen ein!</p>
      <form onSubmit={createGame}>
        <input type="text" name="username" ref={userNameInput} />
        <br />
        <input type="submit" value="Create and join game" />
      </form>
    </InitLayout>
  )
}

export default InitNew
