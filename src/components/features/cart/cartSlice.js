import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      )
      if (existingItemIndex === -1) {
        state.cart.push(action.payload)
      } else {
        const existingItem = state.cart[existingItemIndex]
        existingItem.quantity += 1
        existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice
      }
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload)
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload)
      item.quantity++
      item.totalPrice = item.quantity * item.unitPrice
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload)
      item.quantity--
      item.totalPrice = item.quantity * item.unitPrice
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action)
    },
    clearCart(state) {
      state.cart = []
    },
  },
})

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer

export const getCart = (state) => state.cart.cart

export function getTotalCartQuantity(state) {
  return state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
}

export function getTotalCartPrice(state) {
  return state.cart?.cart?.reduce((sum, item) => sum + item.totalPrice, 0) || 0
}

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.id === id)?.quantity ?? 0
