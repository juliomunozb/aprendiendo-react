import { useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters'
export function Filters () {
  const { filters, setFilters } = useFilters()
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleChangeMinPrice = (event) => {
    // En objetos, el estado anterior no se fusiona automáticamente con el nuevo objeto
    // de estado, debemos fusionar manualmente nuestro objeto de estado con
    // sus propiedades anteriores utilizando el operador de propagación del objeto
    setFilters(prevState => ({
      ...prevState,
      price: event.target.value
    }))
  }

  const handleChangeCategory = (event) => {
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  }
  return (
    <section className='filters'>
      <div>
        <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
        <input
          type='range'
          id={minPriceFilterId}
          min='0'
          max='1000'
          onChange={handleChangeMinPrice}
          value={filters.price}
        />
        <span>{filters.price}</span>
      </div>
      <div>
        <label htmlFor={categoryFilterId}> Categorías</label>
        <select
          id={categoryFilterId}
          onChange={handleChangeCategory}
        >
          <option value='all'>Todas</option>
          <option value='laptops'>Computadores</option>
          <option value='smartphones'>Celulares</option>
        </select>
      </div>
    </section>
  )
}
