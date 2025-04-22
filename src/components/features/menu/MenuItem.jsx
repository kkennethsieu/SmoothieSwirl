import { useDispatch, useSelector } from 'react-redux'
import Button from '../../ui/Button'
import {
  addItem,
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from '../cart/cartSlice'
import { getCurrentQuantityById } from '../cart/cartSlice'
import { useNavigate } from 'react-router-dom'

function MenuItem({ smoothie }) {
  const { name, unitPrice, imageUrl, ingredients, soldOut, id } = smoothie
  const currentQuantity = useSelector(getCurrentQuantityById(id))

  const isInCart = currentQuantity > 0

  const dispatch = useDispatch()

  const navigate = useNavigate()

  function handleClick(e) {
    e.preventDefault()
    const newItem = {
      id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
      ingredients,
    }
    dispatch(addItem(newItem))
  }

  function handleOpenDetails(e) {
    e.preventDefault()
    navigate(`${id}`)
  }

  return (
    <li className="flex gap-x-4 py-2">
      <img
        onClick={handleOpenDetails}
        src={imageUrl}
        className={`h-28 w-28 object-cover hover:cursor-pointer ${soldOut && 'grayscale'}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="mb-1 text-base font-semibold md:text-lg">{name}</p>
        <p className="text-sm capitalize italic md:text-base">{ingredients}</p>
        <div className="mt-auto flex items-center justify-between">
          {soldOut ? <p>Sold Out</p> : <p>${unitPrice.toFixed(2)}</p>}
          <div className="flex items-center space-x-4">
            {isInCart && (
              <>
                <button
                  className="flex items-center justify-center rounded-full bg-blue-400 px-2 py-0.5 text-sm"
                  onClick={() => {
                    dispatch(increaseItemQuantity(id))
                  }}
                >
                  +
                </button>
                <p className="text-sm md:text-base">{currentQuantity}</p>
                <button
                  className="flex items-center justify-center rounded-full bg-blue-400 px-2 py-0.5 text-sm"
                  onClick={() => {
                    dispatch(decreaseItemQuantity(id))
                  }}
                >
                  -
                </button>
              </>
            )}
            {soldOut ? null : currentQuantity ? (
              <Button
                onClick={() => {
                  dispatch(deleteItem(id))
                }}
              >
                Delete
              </Button>
            ) : (
              <Button onClick={handleClick}>Add To Cart</Button>
            )}{' '}
          </div>
        </div>
      </div>
    </li>
  )
}

export default MenuItem
