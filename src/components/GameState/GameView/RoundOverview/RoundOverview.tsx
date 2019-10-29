import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import Header from '../../../ui/Header'
// import './styles.css'
import Button from '../../../ui/Button'
import { unwrapQuery } from '../../../../util/data'
import useGame from '../../../../util/useGame'

const GameRoundOverview = () => {
  const { game, gameInfo } = useGame()
  return (
    <>
      <Header />
      round overview: welcher spieler macht wie viel stiche in welcher farbe?
      <br />
      join game or leave game?
    </>
  )
}

export default GameRoundOverview
