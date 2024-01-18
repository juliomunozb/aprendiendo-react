import { useState, useEffect } from 'react'
import { EVENT } from './const'
export function Route ({ routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
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
  // buscando string del atributo path y comparandolo con window.location.pathname
  const Page = routes.find(({ path }) => path === currentPath)?.Component
  return Page ? <Page /> : <DefaultComponent />
}
