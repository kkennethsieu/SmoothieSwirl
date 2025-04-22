import { configureStore } from '@reduxjs/toolkit'
import userReducer from './components/features/user/userSlice'
import cartReducer from './components/features/cart/cartSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
})

export default store
