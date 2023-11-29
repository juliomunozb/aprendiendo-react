import { useEffect, useState } from 'react'
import './App.css'

function App () {
  const [enable, setEnable] = useState(false)
  const [position, setPotition] = useState({ x: 0, y: 0 })

  // pointer move
  useEffect(() => {
    console.log('effect ', { enable })
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPotition({ x: clientX, y: clientY })
    }

    if (enable) {
      window.addEventListener('pointermove', handleMove)
    }

    // Cleanup. Limpiando la suscriopcion al evento pointermove.
    // Se ejecuta:
    // -> Cuando el componente se desmonta
    // -> Cuando cambian las dependencias, antes de ejecutar el efecto de nuevo
    return () => {
      console.log('cleanup')
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enable])

  // change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enable)
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enable])
  return (
    <main>
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <h1>Proyecto 3</h1>
      <button onClick={() => setEnable(!enable)}>
        {enable ? 'Desactivar' : 'Activar'} Seguir puntero
      </button>
    </main>
  )
}

export default App
