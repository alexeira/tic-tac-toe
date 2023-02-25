import { WINNING_COMBOS } from '../utils/constans'

export function checkWinner(boardToCheck: any) {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo

    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }

  return null
}

export function checkTie(newBoard: any) {
  return newBoard.every((cell: any) => cell !== null)
}
