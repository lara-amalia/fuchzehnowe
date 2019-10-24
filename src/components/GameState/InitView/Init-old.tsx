import React, { useState, useEffect, useRef } from 'react'
import './styles.css'
import Button from '../../ui/Button'
import firebase from 'firebase'
import { Game, Id } from '../../../types'

const Index: React.FC = () => {
  const [games, setGames] = useState<(Game & Id)[]>([])

  const textField = useRef<HTMLInputElement>(null)

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    firebase
      .firestore()
      .collection('games')
      .add({
        name: textField.current!.value,
      } as Game)
  }

  const deleteEntry = (id: string) => () => {
    firebase
      .firestore()
      .collection('games')
      .doc(id)
      .delete()
  }

  return (
    <div className="Index-view">
      <h1 className="App-title">
        <span className="App-title-number">15</span>
        <br />
        owe
      </h1>
      <div className="Index-actions">
        <Button>Neues Spiel</Button>
        <Button>Mitspielen</Button>
      </div>
      <p>
        <a href="#">Spielregeln</a>
      </p>
      <h2>All the games!</h2>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            {game.name} <button onClick={deleteEntry(game.id)}>delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={submitForm}>
        <input type="text" name="gamename" ref={textField} />
        <input type="submit" value="New game" />
      </form>
    </div>
  )
}

export default Index
