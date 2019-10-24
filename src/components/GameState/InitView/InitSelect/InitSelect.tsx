import React, { useState, useEffect, useRef } from 'react'
import './styles.css'
import Button from '../../../ui/Button'
import { InitState } from '../InitView'

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
        <a href="#">Spielregeln</a>
      </p>
    </div>
  )
}

export default InitSelect
