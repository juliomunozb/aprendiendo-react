import { useState, useEffect } from 'react'
import { EVENT } from './const'
import { match } from 'path-to-regexp'

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
  let routeParams = {}

  // buscando string del atributo path y comparandolo con window.location.pathname
  const Page = routes.find(({ path }) => {
    if (path === currentPath) return true
    // Hemos usado path-to-regex
    // para poder dectectar rutas dinámicas
    // como por ejmplo /search/:query <- query es una ruta dinámica
    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false
    // guarda los parámetros de la url que eran dinámicos
    // y que hemos extraido con path-to-regex
    // por ejemplo si la ruta es /search/:query
    // y la url es /search/javascript
    // mached.params.query === javascript
    routeParams = matched.params
    return true
  })?.Component
  return Page
    ? <Page routeParams={routeParams} />
    : <DefaultComponent routeParams={routeParams} />
}
