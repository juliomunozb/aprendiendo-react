import { createContext, useReducer } from 'react'
export const cartContext = createContext()
// Logica de actulización del estado
// Se puede utilizar fuera de react
const inititalState = []
const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action
  switch (actionType) {
    case 'ADD_TO_CART':{
      const { id } = actionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)
      if (productInCartIndex >= 0) {
        // Copia profunda del objeto
        const newState = structuredClone(state)
        newState[productInCartIndex].quantity += 1
        return newState
      }

      return [
        ...state,
        {
          ...actionPayload,
          quantity: 1
        }
      ]
    }

    case 'REMOVE_FROM_CART':{
      const { id } = actionPayload
      return state.filter(item => item.id !== id)
    }

    case 'CLEAR_CART':{
      return inititalState
    }
  }

  return state
}

export function CartProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, inititalState)
  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCard = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({
    type: 'CLEAR_CART'
  })

  const numberItemsInCart = () => {
    return state?.length
  }
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
