import firebase from 'firebase'
import React, { useState } from 'react'
import { GameInfo, Suit } from '../../../../types'
import { FUCHZEHN } from '../../../../util/constants'
import BasicLayout from '../../../ui/BasicLayout'
import GameShortcutSelect from '../../../ui/GameShortcutSelect'
import { gameShortcutToString } from '../../../ui/GameShortcutSelect/'

interface Props {
  onCreation: (gameInfo: GameInfo) => void
  onBack: () => void
}

/**
 * Join an existing game by entering the game ID and a user name.
 */
const InitJoin: React.FC<Props> = ({ onCreation, onBack }) => {
  const [username, setUsername] = useState('')
  const [gameShortcut, setGameShortcut] = useState<Suit[]>([])

  const canJoin = () => {
    const usernameValid = /^[a-z]{3,}$/i.test(username)
    const gameShortcutValid = gameShortcut.length === 4
    return usernameValid && gameShortcutValid
  }

  /**
   * Creates a new user and adds it to the players collection
   * of the given game.
   */
  const joinGame = async (e: React.FormEvent) => {
    e.preventDefault()

    const gamesCollection = firebase.firestore().collection('games')
    const gameShortcutString = gameShortcutToString(gameShortcut)
    const userId = gamesCollection.doc().id

    const existingGame = (await gamesCollection
      .where('shortcut', '==', gameShortcutString)
      .get()).docs[0]

    if (!existingGame) {
      window.alert("Der Schlüssel zum Spiel ist falsch. Probier's nochmal!")
      return
    }

    gamesCollection
      .doc(existingGame.id)
      .collection('players')
      .doc(userId)
      .set({
        name: username,
        points: [FUCHZEHN],
      })

    onCreation({ gameId: existingGame.id, userId })
  }
  return (
    <BasicLayout title="Mitspielen" onBack={onBack}>
      <GameShortcutSelect onChange={setGameShortcut} value={gameShortcut} />
      <form onSubmit={joinGame}>
        <div className="input-wrapper">
          <input
            type="text"
            name="username"
            placeholder="Dein Name"
            value={username}
            onChange={e => setUsername(e.currentTarget.value)}
          />
          <p className="hint-text">
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
