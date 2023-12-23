export const cartInititalState = JSON.parse(window.localStorage.getItem('cart')) || []

export const CART_ACTIONS_CART = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'

}

// update localstorage with state for card
export const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

export const cartReducer = (state, action) => {
  console.log('entra cartReducer')
  const { type: actionType, payload: actionPayload } = action
  switch (actionType) {
    case CART_ACTIONS_CART.ADD_TO_CART:{
      const { id } = actionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)
      if (productInCartIndex >= 0) {
        // Copia profunda del objeto
        const newState = structuredClone(state)
        newState[productInCartIndex].quantity += 1
        updateLocalStorage(newState)
        return newState
      }

      const newState = [
        ...state,
        {
          ...actionPayload,
          quantity: 1
        }
      ]
      updateLocalStorage(newState)
      return newState
    }

    case CART_ACTIONS_CART.REMOVE_FROM_CART:{
      const { id } = actionPayload
      const newState = state.filter(item => item.id !== id)
      updateLocalStorage(newState)
      return newState
    }

    case CART_ACTIONS_CART.CLEAR_CART:{
      updateLocalStorage([])
      return []
    }
  }

  return state
}
