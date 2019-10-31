import firebase from 'firebase'
import React, { useState } from 'react'
import { Game, GameStep, Suit } from '../../../../types'
import useGame from '../../../../util/useGame'
import BasicLayout from '../../../ui/BasicLayout'
import Button from '../../../ui/Button'
import SuitPicker from '../../../ui/SuitPicker'
import TrickPicker from '../../../ui/TrickPicker'
import './styles.css'

const RoundSetup = () => {
  const { game, gameInfo } = useGame()
  const [suit, setSuit] = useState<Suit>()
  const [tricks, setTricks] = useState<number>()

  const startRound = () => {
    firebase
      .firestore()
      .collection('games')
      .doc(gameInfo.gameId)
      .update({
        step: GameStep.Overview,
        rounds: [
          ...game.rounds,
          {
            trump: suit,
            tricks: tricks,
            player: gameInfo.userId,
          },
        ],
      } as Partial<Game>)
  }

  return (
    <BasicLayout title={`Runde #${game.rounds.length + 1}`}>
      <div className="RoundSetup">
        <h2>Trumpf wählen</h2>
        <SuitPicker value={suit} onChange={setSuit} />
        <h2>Stiche wählen</h2>
        <TrickPicker value={tricks} onChange={setTricks} />
      </div>
      <Button onClick={startRound} disabled={!(suit && tricks)}>
        Runde starten
      </Button>
    </BasicLayout>
  )
}

export default RoundSetup
