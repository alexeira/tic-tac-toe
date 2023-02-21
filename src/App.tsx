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
      alert(`Winner is ${newWinner}`)
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

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Cell key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Cell>
          )
        })}

        <section className="turn">
          <Cell isSelected={turn === TURNS.X}>{TURNS.X}</Cell>
          <Cell isSelected={turn === TURNS.O}>{TURNS.O}</Cell>
        </section>
      </section>
    </main>
  )
}
