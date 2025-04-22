import { useDispatch } from 'react-redux'
import { addItem } from '../cart/cartSlice'
import { useNavigate } from 'react-router-dom'

function MenuItemDetailFooter({ price, smoothie }) {
  const { name, unitPrice, ingredients, id } = smoothie
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
    navigate('/menu')
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className="rounded-full bg-blue-400 px-2.5 py-2 text-sm md:text-base"
      >
        <span>Add To Cart</span> <span>${price}</span>
      </button>
    </div>
  )
}

export default MenuItemDetailFooter
