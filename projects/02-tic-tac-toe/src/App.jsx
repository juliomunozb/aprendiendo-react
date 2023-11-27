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

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
function App () {
  // Crea un array y signa el estado inicial con todos los valores a null
  const [board, setBoard] = useState(Array(9).fill(null))
  // Creando estado para saber a quien le toca el turno
  const [turn, setTurn] = useState(TURNS.X)

  // null no hay ganador, false hay un empate
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    // No actualizar posicion si ya se tiene algo
    if (board[index] || winner) return

    // Actualizar tableto para mostrar visualmente la jugada
    const newBoard = [...board] // Se hace copia del board por que no se deberia mutar el estado original.
    newBoard[index] = turn // Asignando valor X u O
    setBoard(newBoard)

    const newWinner = checkWinter(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }

    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }

  const checkWinter = (boardToCheck) => {
    // Revisamos todas las combinaciones ganadores
    // para ver si X u O ganó
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (boardToCheck[a] && // X u O
          boardToCheck[a] === boardToCheck[b] &&
          boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a] // Retorna X u O
      }
    }
    return null
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
