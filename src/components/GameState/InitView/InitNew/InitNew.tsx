import firebase from 'firebase'
import React, { useState } from 'react'
import { Game, GameInfo, GameStep, Player, Suit } from '../../../../types'
import BasicLayout from '../../../ui/BasicLayout'
import { FUCHZEHN } from '../../../../util/constants'

interface Props {
  onCreation: (gameInfo: GameInfo) => void
  onBack: () => void
}

const getFourRandomSuits = () => {
  const SUITS = Object.values(Suit)

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 4)
  }

  const getRandomSuit = () => {
    return SUITS[getRandomNumber()]
  }

  const arr = []
  for (let i = 0; i < 4; i++) {
    arr.push(getRandomSuit())
  }
  return arr.join('-')
}

const getCollisonSafeShortcut = async (): Promise<string> => {
  const candidate = getFourRandomSuits()
  const exists = !!(await firebase
    .firestore()
    .collection('games')
    .where('shortcut', '==', candidate)
    .get()).docs.length

  return exists ? await getCollisonSafeShortcut() : candidate
}

/**
 * Start a new game by adding a new game collection and add the first (admin) player.
 */
const InitNew: React.FC<Props> = ({ onCreation, onBack }) => {
  const [username, setUsername] = useState('')

  /**
   * Creates a new game and adds the first (admin) player to the players collection.
   */
  const createGame = async (e: React.FormEvent) => {
    e.preventDefault()

    const gamesCollection = firebase.firestore().collection('games')
    const adminId = gamesCollection.doc().id
    const gameId = gamesCollection.doc().id

    await Promise.all([
      gamesCollection.doc(gameId).set({
        adminId,
        step: GameStep.Scoreboard,
        rounds: [],
        shortcut: await getCollisonSafeShortcut(),
      } as Game),
      gamesCollection
        .doc(gameId)
        .collection('players')
        .doc(adminId)
        .set({
          name: username,
          points: [FUCHZEHN],
        } as Player),
    ])

    onCreation({ gameId, userId: adminId })
  }

  return (
    <BasicLayout title="Neues Spiel" onBack={onBack}>
      <form onSubmit={createGame}>
        <div className="input-wrapper">
          <input
            type="text"
            name="username"
            value={username}
            onChange={e => setUsername(e.currentTarget.value)}
            placeholder="Dein Name"
          />
          <p className="input-hint">
            Der Name muss mind. 3 Zeichen lang sein und darf nur Buchstaben
            beinhalten.
          </p>
        </div>
        <input
          type="submit"
          value="Los geht's"
          disabled={!/^[a-z]{3,}$/i.test(username)}
        />
      </form>
    </BasicLayout>
  )
}

export default InitNew
