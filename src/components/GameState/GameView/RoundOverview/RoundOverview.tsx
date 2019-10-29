import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { GameInfo } from '../../GameState'
import { Game, Id, Player } from '../../../../types'
import Header from '../../../ui/Header'
// import './styles.css'
import Button from '../../../ui/Button'
import { unwrapQuery } from '../../../../util/data'

interface Props {
  gameInfo: GameInfo
  game: Game
}

const GameRoundOverview: React.FC<Props> = ({ gameInfo, game }) => {
  return (
    <>
      <Header />
      round overview
    </>
  )
}

export default GameRoundOverview
