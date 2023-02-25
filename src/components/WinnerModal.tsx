import { Winner } from '../types'

import { Cell } from './Cell'

interface WinnerProps {
  winner: Winner
  resetGame: () => void
}

export function WinnerModal({ winner, resetGame }: WinnerProps) {
  if (winner === null) return null

  const winnerText = winner === false ? 'Empate' : 'Gano'

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        <header className="win">{winner && <Cell>{winner}</Cell>}</header>
        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  )
}
