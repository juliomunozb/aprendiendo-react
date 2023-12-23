export const cartInititalState = []

export const CART_ACTIONS_CART = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'

}

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action
  switch (actionType) {
    case CART_ACTIONS_CART.ADD_TO_CART:{
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

    case CART_ACTIONS_CART.REMOVE_FROM_CART:{
      const { id } = actionPayload
      return state.filter(item => item.id !== id)
    }

    case CART_ACTIONS_CART.CLEAR_CART:{
      return cartInititalState
    }
  }

  return state
}
