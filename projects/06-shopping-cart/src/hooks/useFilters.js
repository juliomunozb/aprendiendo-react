import { useState } from 'react'
export function useFilters () {
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
  return { filterProducts, setFilter }
}
