import { useState } from 'react'
import './Filters.css'
export function Filters ({ onChange }) {
  const [minPrice, setMinPrice] = useState(0)
  const handleChangeMinPrice = (event) => {
    setMinPrice(event.target.value)
    // En objetos, el estado anterior no se fusiona automáticamente con el nuevo objeto
    // de estado, debemos fusionar manualmente nuestro objeto de estado con
    // sus propiedades anteriores utilizando el operador de propagación del objeto
    onChange(prevState => ({
      ...prevState,
      price: event.target.value
    }))
  }

  const handleChangeCategory = (event) => {
    onChange(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  }
  return (
    <section className='filters'>
      <div>
        <label htmlFor='price'>Precio a partir de:</label>
        <input
          type='range'
          id='price'
          min='0'
          max='1000'
          onChange={handleChangeMinPrice}
        />
        <span>{minPrice}</span>
      </div>
      <div>
        <label htmlFor='category'> Categorías</label>
        <select name='category' id='category' onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          <option value='laptops'>Computadores</option>
          <option value='smartphones'>Celulares</option>
        </select>
      </div>
    </section>
  )
}
