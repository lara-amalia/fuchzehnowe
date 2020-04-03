import * as firebase from 'firebase/app'
import React, { useEffect, useState } from 'react'
import BasicLayout from '../../../ui/BasicLayout'
import HeartsIcon from '../../../ui/HeartsIcon'
import BellsIcon from '../../../ui/BellsIcon'
import AcornsIcon from '../../../ui/AcornsIcon'
import LeavesIcon from '../../../ui/LeavesIcon'
import BackButton from '../../../ui/BackButton'
import './styles.css'

interface Props {
  onBack: () => void
}

const InitAbout: React.FC<Props> = ({ onBack }) => {
  const [gamesFinished, setGamesFinished] = useState()

  useEffect(() => {
    async function fetchGamesCount() {
      const gamesFinished = (await firebase
        .firestore()
        .collection('games')
        .where('gameOver', '==', true)
        .get()).docs.length

      setGamesFinished(gamesFinished)
    }

    fetchGamesCount()
  }, [])
  return (
    <BasicLayout
      title="Infos"
      leftHeaderItem={<BackButton onClick={onBack} />}
      alignment="left"
    >
      <p>
        Klar kann man dieses Kartenspiel auch ohne eine App spielen. Ein Zettel
        und ein Stift reichen, um die Punkte der Spieler zu dokumentieren. Aber
        weil ich mal was Neues ausprobieren wollte, gibt's jetzt "15 owe" :-)
      </p>
      <div>
        <HeartsIcon size={70} color="#23272b" />
        <BellsIcon size={70} color="#23272b" />
      </div>
      <p>
        Noch Fragen oder einen Bug gefunden? Dann findest du mich auf{' '}
        <a
          href="https://twitter.com/lara_amalia"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>{' '}
        oder{' '}
        <a
          href="https://github.com/lara-amalia/fuchzehnowe"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>
      <div>
        <AcornsIcon size={70} color="#23272b" />
        <LeavesIcon size={70} color="#23272b" />
      </div>
      {gamesFinished && <p>Gespielte Spiele: {gamesFinished}</p>}
      <p className="InitAbout-meta-text">
        Build{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://github.com/lara-amalia/fuchzehnowe/commit/${process.env.REACT_APP_RELEASE}`}
        >
          {process.env.REACT_APP_RELEASE}
        </a>
      </p>
    </BasicLayout>
  )
}

export default InitAbout
