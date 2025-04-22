import useGetOrder from './useGetOrder'
import OrderItem from './OrderItem'
import { calcMinutesLeft, formatDate } from '../../../utility/helper'
import { useParams } from 'react-router-dom'
import Loader from '../../ui/Loader'
import useUpdateOrder from './useUpdateOrder'

function Order() {
  const { orderId: paramsId } = useParams()
  const { isLoading, data: order } = useGetOrder(paramsId)
  const { isLoading: loadingOrder, updateOrder } = useUpdateOrder()
  if (isLoading) return <Loader />

  const { orderId, priorityPrice, cart, orderPrice, estimatedDelivery } = order

  const minutesLeft = calcMinutesLeft(estimatedDelivery)

  const totalPrice = orderPrice + priorityPrice
  const newPriorityPrice = totalPrice * 0.2
  const newOrderPrice = totalPrice * 1.2

  function handleUpdatePriority() {
    updateOrder({
      orderId,
      priority: true,
      priorityPrice: newPriorityPrice,
      orderPrice: newOrderPrice,
    })
  }
  return (
    <div className="m-4">
      <div className="flex items-center justify-between space-x-2">
        <h2 className="text-xl font-bold">
          Order #<span className="uppercase">{orderId}</span> status
        </h2>
        <div className="flex items-center space-x-2">
          {priorityPrice ? (
            <button
              disabled
              className="rounded-full bg-red-500 px-3 py-1 text-xs uppercase text-white"
            >
              Priority
            </button>
          ) : null}
          <button
            disabled
            className="whitespace-nowrap rounded-full bg-green-500 px-3 py-1 text-xs uppercase text-white"
          >
            {minutesLeft > 20
              ? 'Preparing order'
              : minutesLeft > 0
                ? 'Delivery On The Way'
                : 'Delivered'}
          </button>
        </div>
      </div>

      <div className="mb-5 mt-5 flex flex-col space-y-4 bg-slate-100 p-5">
        <p className="text-sm font-semibold sm:text-base">
          {minutesLeft > 0
            ? `Only ${minutesLeft} minutes left 😋`
            : `Your smoothies have been delivered!`}
        </p>
        <p className="text-xs text-slate-700 sm:text-sm">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((smoothie) => (
          <OrderItem
            smoothie={smoothie}
            orderPrice={orderPrice}
            key={smoothie.id}
          />
        ))}
      </ul>

      <div className="mb-5 mt-5 flex flex-col space-y-2 bg-slate-100 p-5">
        <p className="text-sm font-medium text-stone-900 sm:text-base">
          Price Order: ${Number(orderPrice).toFixed(2)}
        </p>
        {priorityPrice ? (
          <p className="text-sm font-medium text-slate-900 sm:text-base">
            Price Priority: ${Number(priorityPrice).toFixed(2)}
          </p>
        ) : null}
        <p className="font-bold sm:text-base">
          To Pay on Delivery: ${Number(totalPrice).toFixed(2)}
        </p>
        {priorityPrice === 0 && (
          <button
            onClick={handleUpdatePriority}
            disabled={loadingOrder}
            className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingOrder ? 'Adding Priority...' : 'Make Priority Order'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Order
