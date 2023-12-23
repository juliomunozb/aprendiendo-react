import { useReducer } from 'react'
import { cartInititalState, cartReducer, CART_ACTIONS_CART } from '../reducers/cart'

export function useCardReduders () {
  const [state, dispatch] = useReducer(cartReducer, cartInititalState)
  const addToCart = product => dispatch({
    type: CART_ACTIONS_CART.ADD_TO_CART,
    payload: product
  })

  const removeFromCard = product => dispatch({
    type: CART_ACTIONS_CART.REMOVE_FROM_CART,
    payload: product
  })

  const clearCart = () => dispatch({
    type: CART_ACTIONS_CART.CLEAR_CART
  })

  const numberItemsInCart = () => {
    return state?.length
  }

  return { state, addToCart, removeFromCard, clearCart, numberItemsInCart }
}
