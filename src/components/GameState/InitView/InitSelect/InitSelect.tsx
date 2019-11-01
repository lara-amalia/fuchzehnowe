import React from 'react'
import Button from '../../../ui/Button'
import { InitState } from '../InitView'
import './styles.css'

interface Props {
  onSelection: (state: InitState) => void
}

const InitSelect: React.FC<Props> = ({ onSelection }) => {
  return (
    <div className="InitSelect-view">
      <h1 className="InitSelect-title">
        <span className="InitSelect-title-number">15</span>
        <br />
        owe
      </h1>
      <div className="InitSelect-actions">
        <Button onClick={() => onSelection(InitState.New)}>Neues Spiel</Button>
        <Button onClick={() => onSelection(InitState.Join)}>Mitspielen</Button>
      </div>
      <p>
        <Button
          onClick={() => onSelection(InitState.Rules)}
          variant="secondary"
        >
          Spielregeln
        </Button>
        <br />
        <Button
          onClick={() => onSelection(InitState.About)}
          variant="secondary"
        >
          Infos
        </Button>
      </p>
    </div>
  )
}

export default InitSelect
