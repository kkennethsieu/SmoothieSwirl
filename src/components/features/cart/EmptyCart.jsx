import { Link } from 'react-router-dom'

function EmptyCart() {
  return (
    <div className="px-4s py-3">
      <Link to="/menu">&larr; Back to menu</Link>

      <p className="mt-7 font-semibold">
        Your cart is still empty. Start adding some smoothies :)
      </p>
    </div>
  )
}

export default EmptyCart
