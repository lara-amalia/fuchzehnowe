import * as firebase from 'firebase/app'
import React, { useState } from 'react'
import '../../../../styles/common/layout.css'
import { Player, Suit } from '../../../../types'
import useGame from '../../../../util/useGame'
import BasicLayout from '../../../ui/BasicLayout'
import Button from '../../../ui/Button'
import TrickPicker from '../../../ui/TrickPicker'
import './styles.css'
import { PLAYING_PLACEHOLDER } from '../RoundOverview'
import RoundSummary from '../../../ui/RoundSummary'

const RoundDone = () => {
  const { game, gameInfo, currentPlayer, currentRound, players } = useGame()
  const [tricks, setTricks] = useState<number>()

  const currentRoundData = game.rounds[game.rounds.length - 1]
  const currentRoundPlayer = players.find(
    p => p.id === currentRoundData.player,
  )!
  const userIsCurrentRoundPlayer =
    currentRoundData.player === currentPlayer.id

  const userPlayed =
    currentPlayer.points[currentPlayer.points.length - 1] ===
    PLAYING_PLACEHOLDER

  const setPoints = () => {
    const heartWasTrump = currentRoundData.trump === Suit.Hearts

    let delta = heartWasTrump ? -2 * tricks! : -tricks!
    // If player could not make one trick or could not reach promised amount of tricks
    if (!userIsCurrentRoundPlayer && tricks === 0) {
      delta = heartWasTrump ? 10 : 5
    } else if (userIsCurrentRoundPlayer && tricks! < currentRoundData.tricks) {
      delta = heartWasTrump ? 20 : 10
    }

    // The last array entry is the played-placeholder,
    // so the previous value must be used to calculate points after current round.
    const newPoints =
      currentPlayer.points[currentPlayer.points.length - 2] + delta

    firebase
      .firestore()
      .collection('games')
      .doc(gameInfo.gameId)
      .collection('players')
      .doc(gameInfo.userId)
      .update({
        points: [...currentPlayer.points.slice(0, -1), newPoints],
      } as Partial<Player>)
  }

  return (
    <BasicLayout title={`Runde #${currentRound}`} userName={currentPlayer.name}>
      {userPlayed ? (
        <>
          <RoundSummary
            name={currentRoundPlayer.name}
            tricks={currentRoundData.tricks}
            trump={currentRoundData.trump}
            itIsYou={userIsCurrentRoundPlayer}
          />
          <h2>Meine Stiche</h2>
          <TrickPicker value={tricks} onChange={setTricks} minZero={true} />
          <div className="ViewActions">
            <Button onClick={() => setPoints()} disabled={tricks === undefined}>
              Punkte berechnen...
            </Button>
          </div>
        </>
      ) : (
        <div>
          <p>Aktuelle Punktezahl:</p>
          <p className="RoundDone-current-points">
            {currentPlayer.points[currentPlayer.points.length - 1]}
          </p>
        </div>
      )}
    </BasicLayout>
  )
}

export default RoundDone
