import firebase from 'firebase'
import React, { useRef } from 'react'
import { GameInfo } from '../../../../types'
import Header from '../../../ui/Header'
import './styles.css'
import InitLayout from '../../../ui/InitLayout'

interface Props {
  onCreation: (gameInfo: GameInfo) => void
}

const InitJoin: React.FC<Props> = ({ onCreation }) => {
  const userNameInput = useRef<HTMLInputElement>(null)
  const gameIdInput = useRef<HTMLInputElement>(null)

  const joinGame = async (e: React.FormEvent) => {
    e.preventDefault()

    const gamesCollection = firebase.firestore().collection('games')
    const gameId = gameIdInput.current!.value
    const userId = gamesCollection.doc().id

    gamesCollection
      .doc(gameId)
      .collection('players')
      .doc(userId)
      .set({
        name: userNameInput.current!.value,
        points: [10],
      })

    onCreation({ gameId, userId })
  }
  return (
    <InitLayout>
      <h1>Mitspielen</h1>
      <p>Gib die Spiel-ID und deinen Namen ein!</p>
      <form onSubmit={joinGame}>
        <input
          type="text"
          name="gameid"
          placeholder="game id"
          ref={gameIdInput}
        />
        <br />
        <input
          type="text"
          name="username"
          placeholder="user name"
          ref={userNameInput}
        />
        <br />
        <input type="submit" value="Mitspielen" />
      </form>
    </InitLayout>
  )
}

export default InitJoin
