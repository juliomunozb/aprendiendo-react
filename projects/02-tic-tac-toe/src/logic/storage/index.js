export const saveGameToStorage = ({ board, turn }) => {
  // Guarda la partida en el local storage
  // El localStorage solo recibe string
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () => {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}
