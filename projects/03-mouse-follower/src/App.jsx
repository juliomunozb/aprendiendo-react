import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [enable, setEnable] = useState(false)

  useEffect(() => {
    console.log('Effect', { enable });
  }, [enable])

  return (
    <main>
      <h1>Proyecto 3</h1>
      <button onClick={() => setEnable(!enable)}>
        {enable ? 'Desactivar' : 'Activar'} Seguir puntero
      </button>
    </main>

  )
}

export default App
