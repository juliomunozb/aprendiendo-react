import { useEffect } from 'react'

export function Search ({ routeParams }) {
  useEffect(() => {
    document.title = `Has buscado ${routeParams.query}`
  }
  , [])
  return (
    <h1>Has buscado {routeParams.query}</h1>
  )
}
