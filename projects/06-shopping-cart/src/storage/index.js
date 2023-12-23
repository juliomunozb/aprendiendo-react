export const getCartToStorage = () => {
  return JSON.parse(window.localStorage.getItem('cart')) || []
}
// update localstorage with state for card
export const updateCartToStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

export const resetCartToStorage = () => {
  window.localStorage.removeItem('cart')
}
