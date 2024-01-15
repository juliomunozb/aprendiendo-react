import { useEffect, useState } from 'react'
import './App.css'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import { EVENT } from './const.js'

// crear navegación sin reacargar página
// Cambiar la url de la barra de direciones
export function navigate (href) {
  // cambia la url que se ve en el browser, a la que se quiere ir
  window.history.pushState({}, '', href)
  // Crear evento perzonalizado para avisar que se a creado la url
  const navigationEvent = new Event(EVENT.PUSHSTATE)
  // Despachar el evento
  window.dispatchEvent(navigationEvent)
}

function App () {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener(EVENT.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENT.POPSTATE, onLocationChange)
    return () => {
      window.removeEventListener(EVENT.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENT.POPSTATE, onLocationChange)
    }
  }, [])

  return (
    <main>
      {currentPath === '/' && <Home />}
      {currentPath === '/about' && <About />}
    </main>
  )
}

export default App
