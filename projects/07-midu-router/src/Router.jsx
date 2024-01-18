import { useState, useEffect, Children } from 'react'
import { EVENT } from './const'
import { match } from 'path-to-regexp'

export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
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

  // Agregar rutar de childern <Route /> component
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    // capturamos el valor de props y type que tienen children
    const { name } = type
    const isRoute = name === 'Route'
    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren)
  // buscando string del atributo path y comparandolo con window.location.pathname
  const Page = routesToUse.find(({ path }) => {
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
