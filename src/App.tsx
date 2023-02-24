import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'X',
  O: 'O'
}

const winningCombos = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // diagonal
  [0, 4, 8],
  [2, 4, 6]
]

function Cell({ children, isSelected, updateBoard, index }: any) {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  function handleClick() {
    updateBoard(index)
  }

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  function updateBoard(index: any) {
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    const newBoard = [...board]

    if (board[index] || winner) return

    newBoard[index] = turn

    setTurn(newTurn)
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)

    if (newWinner) {
      setWinner(newWinner)
    } else if (checkTie(newBoard)) {
      setWinner(false)
    }
  }

  function checkWinner(boardToCheck: any) {
    for (const combo of winningCombos) {
      const [a, b, c] = combo

      if (
        boardToCheck[a] && // 0 => x or o
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }

    return null
  }

  function resetGame() {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  function checkTie(newBoard: any) {
    return newBoard.every((cell: any) => cell !== null)
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset</button>
      <section className="game">
        {board.map((cell, index) => {
          return (
            <Cell key={index} index={index} updateBoard={updateBoard}>
              {cell}
            </Cell>
          )
        })}
      </section>

      <section className="turn">
        <Cell isSelected={turn === TURNS.X}>{TURNS.X}</Cell>
        <Cell isSelected={turn === TURNS.O}>{TURNS.O}</Cell>
      </section>

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? 'Empate' : 'Gano'}</h2>
            <header className="win">{winner && <Cell>{winner}</Cell>}</header>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  )
}
