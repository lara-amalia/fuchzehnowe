import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import Header from '../../../ui/Header'
// import './styles.css'
import Button from '../../../ui/Button'
import { unwrapQuery } from '../../../../util/data'
import useGame from '../../../../util/useGame'

const RoundDone = () => {
  const { game, gameInfo } = useGame()
  return (
    <>
      <Header />
      round done --> enter tricks
    </>
  )
}

export default RoundDone
