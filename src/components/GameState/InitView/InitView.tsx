import React, { useState } from 'react'
import { GameInfo } from '../../../types'
import InitJoin from './InitJoin'
import InitNew from './InitNew'
import InitSelect from './InitSelect'
import InitRules from './InitRules'

export enum InitState {
  Select,
  New,
  Join,
  Rules,
}

interface Props {
  onGameInfoSelect: (gameInfo: GameInfo) => void
}

/**
 * On the init view, decide whether to start a new game or join an existing game.
 */
const InitView: React.FC<Props> = ({ onGameInfoSelect }) => {
  const [initState, setInitState] = useState<InitState>(InitState.Select)

  switch (initState) {
    case InitState.Select:
      return <InitSelect onSelection={setInitState} />
    case InitState.New:
      return (
        <InitNew
          onCreation={onGameInfoSelect}
          onBack={() => setInitState(InitState.Select)}
        />
      )
    case InitState.Join:
      return (
        <InitJoin
          onCreation={onGameInfoSelect}
          onBack={() => setInitState(InitState.Select)}
        />
      )
    case InitState.Rules:
      return <InitRules onBack={() => setInitState(InitState.Select)} />
  }
}

export default InitView
