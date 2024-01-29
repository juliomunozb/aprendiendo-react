export { Router } from './components/Router.jsx'
export { Route } from './components/Route.jsx'
export { Link } from './components/Link.jsx'

export function useQueryParams ({ req } = {}) {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    const { query } = req
    return query
  }
  const search = window.location.search
  const params = new URLSearchParams(search)
  return Object.fromEntries(params.entries())
}
