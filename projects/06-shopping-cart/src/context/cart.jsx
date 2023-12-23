import { createContext } from 'react'
import { useCardReduders } from '../hooks/useCardReducers'
export const cartContext = createContext()

export function CartProvider ({ children }) {
  const { state, addToCart, removeFromCard, clearCart, numberItemsInCart } = useCardReduders()
  return (
    <cartContext.Provider value={{
      cart: state,
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
