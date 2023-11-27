import { useState } from 'react'

const TURNS = {
  X: 'x',
  O: 'o'
}
// Cuadrado de cada posicion del tablero
const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App () {
  // Crea un array y signa el estado inicial con todos los valores a null
  const [board, setBoard] = useState(Array(9).fill(null))
  // Creando estado para saber a quien le toca el turno
  const [turn, setTurn] = useState(TURNS.X)

  const updateBoard = (index) => {
    // No actualizar posicion si ya se tiene algo
    if (board[index]) return

    // Copiando el table para mostrar visualmente la jugada
    const newBoard = [...board] // Se hace copia del board por que no se deberia mutar el estado original.
    newBoard[index] = turn // Asignando valor X u O
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }
  return (
    <main className='board'>
      <h1>Tic Tact Toe</h1>
      <section className='game'>
        {
          board.map((cell, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
    </main>
  )
}

export default App
