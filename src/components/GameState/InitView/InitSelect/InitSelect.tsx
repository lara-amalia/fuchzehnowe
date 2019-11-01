import React, { useRef } from 'react'
import { GameInfo } from '../../../../types'
import Button from '../../../ui/Button'
import { LOCAL_STORAGE_KEY } from '../../GameState'
import { InitState } from '../InitView'
import './styles.css'

interface Props {
  onSelection: (state: InitState) => void
  onResume: (gameInfo: GameInfo) => void
}

const InitSelect: React.FC<Props> = ({ onSelection, onResume }) => {
  const storedGameData = useRef(window.localStorage.getItem(LOCAL_STORAGE_KEY))
  const _onResume = () => {
    if (storedGameData.current) {
      onResume(JSON.parse(storedGameData.current))
    }
  }

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
        <Button onClick={_onResume} disabled={!storedGameData.current}>
          Weiterspielen
        </Button>
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
