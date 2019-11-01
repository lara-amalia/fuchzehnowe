import React from 'react'
import BasicLayout from '../../../ui/BasicLayout'

interface Props {
  onBack: () => void
}

const InitRules: React.FC<Props> = ({ onBack }) => {
  return (
    <BasicLayout title="Spielregeln" onBack={onBack} alignment="left">
      <p>
        "Fuchzehn owe" ist ein Kartenspiel, das mit{' '}
        <a
          href="https://de.wikipedia.org/wiki/Spielkarte#Ungarisches/Mitteleuropäisches/Doppeldeutsches_Blatt"
          target="_blank"
          rel="noopener noreferrer"
        >
          doppeldeutschen Spielkarten
        </a>{' '}
        (Herz, Pik, Eichel, Schellen) gespielt wird. Die optimale Anzahl an
        Spielern ist 3 bis 5. Manche kennen das Spiel eventuell unter dem Namen{' '}
        <a
          href="https://de.wikipedia.org/wiki/Schnellen_(Kartenspiel)"
          target="_blank"
          rel="noopener noreferrer"
        >
          Schnellen
        </a>
        .
      </p>
      <h2>Ziel des Spiels</h2>
      <p>
        Am Anfang des Spiels hat jeder Spieler 15 Punkte, die er so schnell wie
        möglich "runterspielen" muss (=> 15 owe). Sobald der erste Spieler bei
        -1 Punkt angelangt ist, ist das Spiel vorbei. (Optional können die
        verbleibenden Spieler natürlich weiterspielen.)
      </p>
      <p>
        Jeder Stich reduziert die Punkteanzahl um 1, erhält man keinen Stich,
        bekommt man 5 Strafpunkte dazu. Ist in einer Runde Herz Trumpf, zählen
        sämtliche Punkte doppelt.
      </p>
      <h2>Eine Runde – Vorbereitung</h2>
      <p>
        Der Geber gibt jedem Spieler 5 Karten. Der Spieler links vom Geber
        beginnt und sagt, wie viele Stiche er mit seinen Karten machen wird,
        könnte er die Trumpf-Farbe bestimmen. Im Uhrzeigersinn reihum
        akzeptieren die Spieler das Gebot oder überbieten, um selbst den Trumpf
        bestimmen zu können. Einzig der Geber kann die selbe Anzahl an Stichen
        ansagen und somit den Trumpf bestimmen.
      </p>
      <p>
        Steht der Trumpf fest, kann jeder Spieler, der noch mehr als 5 Punkte
        hat, entscheiden auszusteigen und bekommt so einen Pluspunkt (ist Herz
        Trumpf, zwei Pluspunkte). Alle anderen Spieler, die noch mehr als 5
        Punkte haben, können nach der Reihe Karten austauschen (es beginnt der
        Spieler, der den Trumpf bestimmt hat).
      </p>
      <h2>Eine Runde – Stechen</h2>
      <p>
        Der Spieler, der den Trumpf für die Runde bestimmt hat, beginnt.
        Grundsätzlich gilt immer Farbzwang. Hat man die richtige Farbe nicht,
        gilt Stechzwang. Ansonsten kann man eine beliebige Karte spielen.
      </p>
      <p>
        Der "Weli" (Schellen VI) gilt immer als die zweithöchste Karte (Trumpf)
        im Spiel.
      </p>
      <h2>Punktevergabe</h2>
      <p>
        Am Ende einer Runde sollte zumindest jeder Spieler mind. einen Stich
        gemacht haben. Wer keinen Stich hat, "fällt" und bekommt 5 Punkte dazu.
        Jeder Stich zieht je einen Punkt ab. Hat der höchstbietende Spieler
        seine Anzahl an Stichen nicht erreicht, "fällt" auch dieser. Ist Herz
        Trumpf, zählen alle Plus- und Minuspunkte doppelt. Das Spiel endet,
        sobald der erste Spieler -1 Punkt erreicht hat.
      </p>
      <h2>Und warum diese App?</h2>
      <p>
        Die "15 owe" App erleichtert das Punkte-Zählen während einem Spiel.
        Außerdem wird der Punkteverlauf der Spieler visualisiert und eventuell
        kann man auch bald andere tolle Sachen damit machen... :)
      </p>
    </BasicLayout>
  )
}

export default InitRules
