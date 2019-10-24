import React, { useState, useEffect, useRef } from 'react'
import { InitState } from '../InitView'
import firebase from 'firebase'
import { Game, Id } from '../../../../types'
import { GameInfo } from '../../GameState'

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
      })

    onCreation({ gameId, userId })
  }
  return (
    <div className="InitJoin-view">
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
    </div>
  )
}

export default InitJoin
