import firebase from 'firebase'
import React, { useRef, useState } from 'react'
import { GameInfo } from '../../../../types'
import BasicLayout from '../../../ui/BasicLayout'

interface Props {
  onCreation: (gameInfo: GameInfo) => void
  onBack: () => void
}

/**
 * Join an existing game by entering the game ID and a user name.
 */
const InitJoin: React.FC<Props> = ({ onCreation, onBack }) => {
  const gameIdInput = useRef<HTMLInputElement>(null)
  const [username, setUsername] = useState('')

  const canJoin = () => {
    const usernameValid = /^[a-z]{3,}$/i.test(username)
    const gameidValid = true // TODO: check game ID
    return usernameValid && gameidValid
  }

  /**
   * Creates a new user and adds it to the players collection
   * of the given game.
   */
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
        name: username,
        points: [10],
      })

    onCreation({ gameId, userId })
  }
  return (
    <BasicLayout title="Mitspielen" onBack={onBack}>
      <p>Gib die Spiel-ID und deinen Namen ein!</p>
      <form onSubmit={joinGame}>
        <input
          type="text"
          name="gameid"
          placeholder="game id"
          ref={gameIdInput}
        />
        <br />
        <div className="input-wrapper">
          <input
            type="text"
            name="username"
            placeholder="Dein Name"
            value={username}
            onChange={e => setUsername(e.currentTarget.value)}
          />
          <p className="input-hint">
            Der Name muss mind. 3 Zeichen lang sein und darf nur Buchstaben
            beinhalten.
          </p>
        </div>
        <input type="submit" value="Mitspielen" disabled={!canJoin()} />
      </form>
    </BasicLayout>
  )
}

export default InitJoin
