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

  const removeFromCard = product => {
    // Puede no acceder al ultimo valor que tiene el estado
    // es buena practica usar la funcion para recibir el ultimo
    // valor del estado prevState y devuelve el nueva valor
    // setCart(cart.filter(item => item.id !== product.id)) //No se recomendable
    setCart(prevState => prevState.filter(item => item.id !== product.id))
  }

  const clearCart = () => {
    setCart([])
  }

  const numberItemsInCart = () => {
    return cart?.length
  }
  return (
    <cartContext.Provider value={{
      cart,
      addToCart,
      removeFromCard,
      clearCart,
      numberItemsInCart

    }}
    >
      {children}
    </cartContext.Provider>
  )
}