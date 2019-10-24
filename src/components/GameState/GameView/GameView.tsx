import React, { useState, useEffect } from 'react'
import { Game, Id } from '../../../types'
import firebase from 'firebase'
import { GameInfo } from '../GameState'

enum GameState {
  Scoreboard,
  RoundSetup,
  RoundOverview,
  RoundDone,
}

interface Props {
  gameInfo: GameInfo
}

const GameView: React.FC<Props> = ({ gameInfo }) => {
  const [game, setGame] = useState<Game & Id>()

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc(gameInfo.gameId)
      .onSnapshot(snapshot => {
        const data = snapshot.data()
        if (!data) {
          setGame(undefined)
          return
        }
        setGame({
          ...data,
          id: snapshot.id,
        } as Game & Id)
      })

    return () => {
      unsubscribe()
    }
  }, [gameInfo.gameId])

  if (!game) {
    return <p>loading...</p>
  }

  return <p>{gameInfo.gameId}</p>
}

export default GameView
