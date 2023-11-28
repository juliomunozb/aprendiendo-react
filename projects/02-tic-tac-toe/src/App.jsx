import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'
import { Board } from './components/Board'
import { checkWinter, checkEndGame } from './logic/board'
import { TURNS } from './constants'

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
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className='board'>
      <h1>Tic Tact Toe</h1>
      <button onClick={resetGame}> Reset del juego</button>
      <Board board={board} updateBoard={updateBoard} />
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
