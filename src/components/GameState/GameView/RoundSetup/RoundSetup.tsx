import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { Game, Id, Player, Suit } from '../../../../types'
import Header from '../../../ui/Header'
// import './styles.css'
import Button from '../../../ui/Button'
import { unwrapQuery } from '../../../../util/data'
import useGame from '../../../../util/useGame'
import ButtonGroup from '../../../ui/ButtonGroup/ButtonGroup'
import SuitPicker from '../../../ui/SuitPicker'

const RoundSetup = () => {
  const { game, gameInfo } = useGame()
  const [suit, setSuit] = useState<Suit>()

  return (
    <>
      <Header />
      <h1>Runde #xy</h1>
      <SuitPicker value={suit} onChange={setSuit} />
    </>
  )
}

export default RoundSetup
