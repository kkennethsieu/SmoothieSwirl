import { Link } from 'react-router-dom'
import CartItem from './CartItem'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getCart } from './cartSlice'
import EmptyCart from './EmptyCart'

function Cart() {
  const cart = useSelector(getCart)

  const dispatch = useDispatch()

  const username = useSelector((state) => state.user.username)

  if (!cart.length) return <EmptyCart />

  return (
    <div className="m-3 text-sm">
      <Link to="/menu" className="text-blue-500">
        &larr; Back to menu
      </Link>

      <h2 className="mb-5 mt-9 text-lg font-semibold capitalize md:text-xl">
        Your cart, {username}
      </h2>

      <ul className="divide-y divide-stone-200 px-2">
        {cart.map((smoothie, index) => (
          <CartItem smoothie={smoothie} key={index} />
        ))}
      </ul>

      <div className="mt-4 flex items-center space-x-4">
        <Link
          to="/orders/new"
          className="rounded-full bg-blue-400 px-2.5 py-2 text-sm md:text-base"
        >
          Order Smoothies
        </Link>
        <Button
          onClick={() => {
            dispatch(clearCart())
          }}
        >
          Clear Cart
        </Button>
      </div>
    </div>
  )
}

export default Cart
