import { WINNER_COMBOS } from '../constants'
export const checkWinter = (boardToCheck) => {
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

export const checkEndGame = (newBoard) => {
  // revisaremos si no hay empate
  // Si no hay mas espacios vacios en el trablero
  return newBoard.every((square) => square !== null)
}
