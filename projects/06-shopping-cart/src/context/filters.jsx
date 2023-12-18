import { createContext, useState } from 'react'

// 1. Crar contexto.
// Es es el que tenemos que consumir
export const FilterContext = createContext()

// 2. Proveer contexto
// Este es el que nos provee de acceso al contexto
export function FilterProvider ({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    price: 0
  })
  return (
    <FilterContext.Provider value={{
      filters,
      setFilters
    }}
    >
      {children}
    </FilterContext.Provider>
  )
}
