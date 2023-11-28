import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'
import { Board } from './components/Board'
import { checkWinter, checkEndGame } from './logic/board'
import { TURNS } from './constants'
import { saveGameToStorage, resetGameStorage } from './logic/storage'

function App () {
  // Crea un array y signa el estado inicial con todos los valores a null
  // El useState solo se ejecuta una vez
  // Se iniciliza el stado una sola vez
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  // Creando estado para saber a quien le toca el turno
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    // ?? devuelve el primer argumento cuando este no es null ni undefined.
    // En caso contrario, devuelve el segundo.
    return turnFromStorage ?? TURNS.X
  })
  // null no hay ganador, false hay un empate
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    // No actualizar posicion si ya se tiene algo
    if (board[index] || winner) return

    // Actualizar tableto para mostrar visualmente la jugada
    const newBoard = [...board] // Se hace copia del board por que no se deberia mutar el estado original.
    newBoard[index] = turn // Asignando valor X u O
    setBoard(newBoard)

    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Guarda la partida en el local storage
    // El localStorage solo recibe string
    saveGameToStorage({ board: newBoard, turn: newTurn })

    const newWinner = checkWinter(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
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
