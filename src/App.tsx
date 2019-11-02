import React from 'react'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import GameState from './components/GameState'
import './App.css'

firebase.initializeApp({
  apiKey: 'AIzaSyANcUCFHaueADM2ak-RyjjZ_ZfuxeSxnnA',
  authDomain: 'fuchzehnowe.firebaseapp.com',
  databaseURL: 'https://fuchzehnowe.firebaseio.com',
  projectId: 'fuchzehnowe',
  storageBucket: 'fuchzehnowe.appspot.com',
  messagingSenderId: '861184582125',
  appId: '1:861184582125:web:325d966a629dbcebebc7e4',
})

const App: React.FC = () => {
  return (
    <div className="App">
      <GameState />
    </div>
  )
}

export default App
