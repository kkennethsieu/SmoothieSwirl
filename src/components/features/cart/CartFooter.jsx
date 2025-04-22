import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice'

function CartFooter() {
  const cart = useSelector((state) => state.cart.cart)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const totalCartQuantity = useSelector(getTotalCartQuantity)
  if (cart.length === 0) return
  return (
    <div className="flex h-14 items-center justify-between bg-blue-200 p-5 sm:h-16">
      <div className="space-x-3 text-sm text-stone-800 sm:text-base md:text-lg">
        <span>
          {totalCartQuantity}
          {totalCartQuantity === 1 ? ' Smoothie' : ' Smoothies'}{' '}
        </span>
        <span>${totalCartPrice.toFixed(2)}</span>
      </div>
      <Link
        to="/cart"
        className="mx-3 text-sm text-stone-800 sm:text-base md:text-lg"
      >
        Open Cart →
      </Link>
    </div>
  )
}

export default CartFooter
