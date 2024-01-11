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
      // Manera de hacer copiar de objeto:
      // 1.  Copia profunda del objeto con structuredClone
      const newState = structuredClone(state)
      newState[productInCartIndex].quantity += 1

      // 2. Usando map
      /* const newState = state.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item
      }) */

      // 3. Usando spread operator y slice
      /* const newState = [
        ...state.slice(0, productInCartIndex),
        {
          ...state[productInCartIndex],
          quantity: state[productInCartIndex].quantity + 1
        },
        ...state.slice(productInCartIndex + 1)
      ] */
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
