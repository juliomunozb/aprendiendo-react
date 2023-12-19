import { useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons'
import './Cart.css'
export function Cart () {
  const cartCheckboxId = useId()
  return (
    <>
      <label htmlFor={cartCheckboxId} className='cart-button'>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />
      <aside className='cart'>
        <ul>
          <li>
            <img src='https://i.dummyjson.com/data/products/30/thumbnail.jpg' alt='iphone' />
            <div>
              <strong>iphone</strong> - $152
            </div>
            <footer>
              <small>
                Q: 1
              </small>
              <button>+</button>
            </footer>
          </li>
        </ul>
        <button><ClearCartIcon /></button>
      </aside>
    </>
  )
}
