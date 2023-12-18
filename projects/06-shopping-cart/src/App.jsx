import { useState } from 'react'
import { Products } from './components/Products'
import { products as inititalProducts } from './mocks/products.json'
import { Header } from './components/Hearder.jsx'
import { useFilters } from './hooks/useFilters.js'
import { Footer } from './components/Footer.jsx'
import { IS_DEVELOPMENT } from './config.js'

function App () {
  const [products] = useState(inititalProducts)
  const { filterProducts } = useFilters()
  const filteredProducts = filterProducts(products)
  return (
    <>
      <Header />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </>
  )
}

export default App
