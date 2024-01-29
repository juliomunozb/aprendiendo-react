import { useEffect } from 'react'
import { useQueryParams } from '../index.jsx'
export function Search ({ routeParams }) {
  const { limit } = useQueryParams()
  useEffect(() => {
    document.title = `Has buscado ${routeParams.query}`
  }
  , [])
  return (
    <h1>Has buscado {routeParams.query} - {limit}</h1>
  )
}
