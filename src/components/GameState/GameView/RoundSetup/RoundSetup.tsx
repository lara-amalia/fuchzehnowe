// import firebase from 'firebase'
import React, { useState } from 'react'
import { Suit } from '../../../../types'
// import useGame from '../../../../util/useGame'
import BasicLayout from '../../../ui/BasicLayout'
import SuitPicker from '../../../ui/SuitPicker'

const RoundSetup = () => {
  // const { game, gameInfo } = useGame()
  const [suit, setSuit] = useState<Suit>()

  return (
    <BasicLayout title="Round #xy">
      <SuitPicker value={suit} onChange={setSuit} />
    </BasicLayout>
  )
}

export default RoundSetup
