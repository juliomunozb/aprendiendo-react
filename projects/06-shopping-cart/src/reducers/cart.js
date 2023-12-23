import { getCartToStorage, updateCartToStorage, resetCartToStorage } from '../storage'
export const cartInititalState = getCartToStorage()

export const CART_ACTIONS_CART = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}
const UPDATE_STATE_BY_ACTION = {
  [CART_ACTIONS_CART.ADD_TO_CART]: (state, action) => {
    const { payload: actionPayload } = action
    const { id } = actionPayload
    const productInCartIndex = state.findIndex(item => item.id === id)
    if (productInCartIndex >= 0) {
      // Copia profunda del objeto
      const newState = structuredClone(state)
      newState[productInCartIndex].quantity += 1
      updateCartToStorage(newState)
      return newState
    }

    const newState = [
      ...state,
      {
        ...actionPayload,
        quantity: 1
      }
    ]
    updateCartToStorage(newState)
    return newState
  },
  [CART_ACTIONS_CART.REMOVE_FROM_CART]: (state, action) => {
    const { id } = action.payload
    const newState = state.filter(item => item.id !== id)
    updateCartToStorage(newState)
    return newState
  },
  [CART_ACTIONS_CART.CLEAR_CART]: () => {
    resetCartToStorage()
    return []
  }
}

export const cartReducer = (state, action) => {
  const { type: actionType } = action
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  return updateState ? updateState(state, action) : state
}
