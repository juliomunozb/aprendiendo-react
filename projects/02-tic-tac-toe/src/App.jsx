import { useState } from 'react'

const TURNS = {
  X: 'x',
  O: 'o'
}
// Cuadrado de cada posicion del tablero
const Square = ({ children, isSelected, updateBoard, index }) => {
  return (
    <div className='square'>
      {children}
    </div>
  )
}

function App () {
  // Crea un array y signa el estado inicial con todos los valores a null
  const [board, setBoard] = useState(Array(9).fill(null))

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
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
    </main>
  )
}

export default App
