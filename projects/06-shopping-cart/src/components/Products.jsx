import '../components/Products.css'
import { useCart } from '../hooks/useCart'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx'
export function Products ({ products }) {
  const { addToCart, removeFromCard, cart } = useCart()
  const checkProductInCar = product => {
    return cart.some(item => item.id === product.id)
  }
  return (
    <main className='products'>
      <ul>
        {
          products.map(product => {
            const isProductInCart = checkProductInCar(product)
            return (
              <li key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <div>
                  <strong>{product.title} - {product.price}</strong>
                </div>
                <div>
                  <button
                    style={{ background: isProductInCart ? 'red' : '#09f' }} onClick={() =>
                      isProductInCart
                        ? removeFromCard(product)
                        : addToCart(product)}
                  >
                    {
                      isProductInCart
                        ? <RemoveFromCartIcon />
                        : <AddToCartIcon />
                    }
                  </button>
                </div>
              </li>
            )
          })
        }
      </ul>
    </main>
  )
}
