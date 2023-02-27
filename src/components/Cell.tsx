interface CellProps {
  children?: string
  isSelected?: boolean
  updateBoard?: (index: number) => void
  index: number
}

export function Cell({ children, isSelected, updateBoard, index }: CellProps) {
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
