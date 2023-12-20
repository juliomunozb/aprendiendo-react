import { useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons'
import './Cart.css'
import { useCart } from '../hooks/useCart'

function CartItem ({ thumbnail, price, title, quantity, addToCart }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - {price}
      </div>
      <footer>
        <small>
          Q: {quantity}
        </small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}
export function Cart () {
  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart, numberItemsInCart } = useCart()
  const className = numberItemsInCart() >= 1 ? 'label-cart cart-button cart-button-number' : 'label-cart cart-button'
  return (
    <>
      <label htmlFor={cartCheckboxId} className={className}>
        <CartIcon />
        {numberItemsInCart() > 0 ? <span>{numberItemsInCart()}</span> : ''}
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />
      <aside className='cart'>
        <ul>
          {cart.map(product => (

            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>
        <button onClick={clearCart}><ClearCartIcon /></button>
      </aside>
    </>
  )
}
