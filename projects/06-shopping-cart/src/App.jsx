import { useState } from 'react'
import { Products } from './components/Products'
import { products as inititalProducts } from './mocks/products.json'
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
      <h1>Shopping cart Shopping Cart 🛒</h1>
      <Products products={filteredProducts} />
    </>
  )
}

export default App
