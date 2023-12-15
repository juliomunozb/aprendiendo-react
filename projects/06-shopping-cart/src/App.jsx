import { useState } from 'react'
import { Products } from './components/Products'
import { products as inititalProducts } from './mocks/products.json'
import { Header } from './components/Hearder.jsx'

function App () {
  const [products] = useState(inititalProducts)
  const [filter, setFilter] = useState({
    category: 'smartphones',
    price: 0
  })

  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= filter.price &&
        (filter.category === 'all' ||
        product.category === filter.category
        )
      )
    })
  }

  const filteredProducts = filterProducts(products)
  return (
    <>
      <Header />
      <Products products={filteredProducts} />
    </>
  )
}

export default App
