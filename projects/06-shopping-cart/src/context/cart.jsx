import { createContext, useState } from 'react'
export const cartContext = createContext()

export function CartProvider ({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = product => {
    // Check if product exist in the cart
    const productInCartIndex = cart.findIndex(item => item.id === product.id)
    if (productInCartIndex >= 0) {
      // Copia profunda del objeto
      const newCart = structuredClone(cart)
      newCart[productInCartIndex].quantity += 1
      return setCart(newCart)
    }
    // Product not exist in the cart
    setCart(prevState => (
      [...prevState,
        {
          ...product,
          quantity: 1
        }
      ]
    ))
  }
  const clearCart = () => {
    setCart([])
  }

  return (
    <cartContext.Provider value={{
      cart,
      addToCart,
      clearCart
    }}
    >
      {children}
    </cartContext.Provider>
  )
}
