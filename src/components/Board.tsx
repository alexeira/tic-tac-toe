import { BoardType } from '../types'

import { Cell } from './Cell'

interface BoardProps {
  board: BoardType
  updateBoard: (index: number) => void
}

export function Board({ board, updateBoard }: BoardProps) {
  const cells: JSX.Element = board.map((cell, index: number) => {
    return (
      <Cell key={index} index={index} updateBoard={updateBoard}>
        {cell}
      </Cell>
    )
  })

  return cells
}
