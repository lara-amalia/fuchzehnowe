import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { Game, Id, Player } from '../../../../types'
import Header from '../../../ui/Header'
// import './styles.css'
import Button from '../../../ui/Button'
import { unwrapQuery } from '../../../../util/data'
import useGame from '../../../../util/useGame'

const GameRoundSetup = () => {
  const { game, gameInfo } = useGame()
  return (
    <>
      <Header />
      round setup
    </>
  )
}

export default GameRoundSetup
