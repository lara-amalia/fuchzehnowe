import React, { useState, useEffect, useRef } from 'react'
import { Game, Id } from '../../../types'
import InitSelect from './InitSelect'
import InitNew from './InitNew'
import { GameInfo } from '../GameState'
import InitJoin from './InitJoin'

export enum InitState {
  Select,
  New,
  Join,
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
      return <InitNew onCreation={onGameInfoSelect} />
    case InitState.Join:
      return <InitJoin onCreation={onGameInfoSelect} />
  }
}

export default InitView
