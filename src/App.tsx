import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'

import { Cell } from './components/Cell'
import { WinnerModal } from './components/WinnerModal'
import { Board } from './components/Board'
import { TURNS } from './utils/constans'
import { checkTie, checkWinner } from './logic/board'
import { BoardType, Winner } from './types'

export default function App() {
  const [board, setBoard] = useState<BoardType>(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState<Winner>(null)

  function updateBoard(index: number) {
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    const newBoard = [...board]

    if (board[index] || winner) return

    newBoard[index] = turn

    setTurn(newTurn)
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)

    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkTie(newBoard)) {
      setWinner(false)
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset</button>
      <section className="game">
        <Board board={board} updateBoard={updateBoard} />
      </section>

      <section className="turn">
        <Cell isSelected={turn === TURNS.X}>{TURNS.X}</Cell>
        <Cell isSelected={turn === TURNS.O}>{TURNS.O}</Cell>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}
