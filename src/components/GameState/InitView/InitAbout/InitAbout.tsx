import React from 'react'
import BasicLayout from '../../../ui/BasicLayout'
import HeartsIcon from '../../../ui/HeartsIcon'
import BellsIcon from '../../../ui/BellsIcon'
import AcornsIcon from '../../../ui/AcornsIcon'
import LeavesIcon from '../../../ui/LeavesIcon'

interface Props {
  onBack: () => void
}

const InitAbout: React.FC<Props> = ({ onBack }) => {
  return (
    <BasicLayout title="Infos" onBack={onBack} alignment="left">
      <p>
        Klar kann man dieses Kartenspiel auch ohne eine App spielen. Ein Zettel
        und ein Stift reichen, um die Punkte der Spieler zu dokumentieren. Aber
        weil ich mal was Neues ausprobieren wollte, gibt's jetzt "15 owe" :-)
      </p>
      <div>
        <HeartsIcon size={70} color="#23272b" />
        <BellsIcon size={70} color="#23272b" />
        <AcornsIcon size={70} color="#23272b" />
        <LeavesIcon size={70} color="#23272b" />
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
          href="https://github.com/lara-amalia"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>
    </BasicLayout>
  )
}

export default InitAbout
