import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from './cartSlice'

function CartItem({ smoothie }) {
  const { name, quantity, id, totalPrice } = smoothie
  const dispatch = useDispatch()

  return (
    <li className="flex flex-col py-2 text-sm sm:flex-row sm:items-center sm:justify-between sm:text-base md:text-base">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between space-x-4">
        <p>${totalPrice.toFixed(2)}</p>
        <div className="flex space-x-4">
          <button
            className="flex items-center justify-center rounded-full bg-blue-400 px-2 py-0.5 text-sm"
            onClick={() => {
              console.log(id)
              dispatch(increaseItemQuantity(id))
            }}
          >
            +
          </button>
          <p>{quantity}</p>
          <button
            className="flex items-center justify-center rounded-full bg-blue-400 px-2 py-0.5 text-sm"
            onClick={() => {
              console.log(id)
              dispatch(decreaseItemQuantity(id))
            }}
          >
            -
          </button>
        </div>
        <Button
          onClick={() => {
            dispatch(deleteItem(id))
          }}
        >
          Delete
        </Button>
      </div>
    </li>
  )
}

export default CartItem
