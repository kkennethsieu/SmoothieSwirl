function OrderItem({ smoothie }) {
  const { name, quantity, totalPrice, ingredients } = smoothie
  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between gap-4 text-sm sm:text-base">
        <p>
          {quantity}&times; {name}
        </p>
        <p>${totalPrice.toFixed(2)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500 sm:text-base">
        {ingredients}
      </p>
    </li>
  )
}

export default OrderItem
