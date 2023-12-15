import { useState } from 'react'
import { Products } from './components/Products'
import { products as inititalProducts } from './mocks/products.json'
import { Header } from './components/Hearder.jsx'
import { useFilters } from './hooks/useFilters.js'

function App () {
  const [products] = useState(inititalProducts)
  const { filterProducts, setFilter } = useFilters()
  const filteredProducts = filterProducts(products)
  return (
    <>
      <Header changeFilters={setFilter} />
      <Products products={filteredProducts} />
    </>
  )
}

export default App
