import * as firebase from 'firebase/app'
import 'firebase/firestore'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import GameState from './components/GameState'
import StatsDetails from './components/GameStats/StatsDetails'
import StatsOverview from './components/GameStats/StatsOverview'

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: 'AIzaSyANcUCFHaueADM2ak-RyjjZ_ZfuxeSxnnA',
    authDomain: 'fuchzehnowe.firebaseapp.com',
    databaseURL: 'https://fuchzehnowe.firebaseio.com',
    projectId: 'fuchzehnowe',
    storageBucket: 'fuchzehnowe.appspot.com',
    messagingSenderId: '861184582125',
    appId: '1:861184582125:web:325d966a629dbcebebc7e4',
  })
}

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={GameState} />
          <Route exact path="/stats" component={StatsOverview} />
          <Route path="/stats/:gameId" component={StatsDetails} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
