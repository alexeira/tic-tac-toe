import { BoardType, Winner } from '../types'

import { Cell } from './Cell'

interface BoardProps {
  board: BoardType
  updateBoard: (index: number) => void
}

export function Board({ board, updateBoard }: BoardProps) {
  const cells = board.map((cell: Winner, index: number) => {
    return (
      <Cell key={index} index={index} updateBoard={updateBoard}>
        {cell}
      </Cell>
    )
  })

  return cells
}
