import { useDispatch, useSelector } from 'react-redux'
import Button from '../../ui/Button'
import { useState } from 'react'
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice'
import { fetchAddress } from '../user/userSlice'
import { useForm } from 'react-hook-form'

import useCreateOrder from './useCreateOrder'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  )

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false)
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user)
  const { isLoading, createOrder } = useCreateOrder()
  const dispatch = useDispatch()

  const cart = useSelector(getCart)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + priorityPrice

  const estimatedDeliveryDate = new Date()
  estimatedDeliveryDate.setMinutes(estimatedDeliveryDate.getMinutes() + 30)
  const estimatedDelivery = estimatedDeliveryDate.toISOString()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  function onSubmit(data) {
    if (!isValidPhone(data.phone)) {
      return { phone: 'Please provide a valid phone number.' }
    }

    const order = {
      ...data,
      orderId: crypto.randomUUID().slice(0, 6),
      cart: JSON.parse(data.cart),
      priorityPrice: Number(priorityPrice),
      orderPrice: Number(totalPrice),
      estimatedDelivery: data.estimatedDelivery,
      status: 'pending',
    }
    createOrder(order)
    reset()
    dispatch(clearCart())
  }

  return (
    <div className="mt-4 flex flex-col p-3">
      <h2 className="mb-1 text-base font-semibold md:text-lg">
        Ready to order? Let's Go!
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Name */}
        <div className="my-5 flex items-center justify-between space-x-6 text-sm md:text-base">
          <label className="w-[150px]">First Name</label>
          <input
            {...register('customer', { required: 'First name is required' })}
            className="flex flex-grow rounded-full border border-blue-500 px-5 py-3 capitalize"
            type="text"
            defaultValue={username}
          />
          {errors.customer && (
            <p className="text-red-700">{errors.customer.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="my-5 flex items-center justify-between space-x-6 text-sm md:text-base">
          <label className="w-[150px]">Phone Number</label>
          <input
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Invalid phone number',
              },
            })}
            className="flex flex-grow rounded-full border border-blue-500 px-5 py-3"
            type="tel"
            placeholder="Phone Number"
          />
          {errors.phone && (
            <p className="text-red-700">{errors.phone.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="relative my-5 mb-6 flex items-center justify-between space-x-6 text-sm md:text-base">
          <label className="w-[150px]">Address</label>
          <input
            {...register('address', { required: 'Address is required' })}
            className="flex flex-grow rounded-full border border-blue-500 px-5 py-3"
            type="text"
            disabled={isLoading}
            defaultValue={address}
            placeholder="Address"
          />
          {addressStatus === 'error' && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {errorAddress}
            </p>
          )}
          {!position.latitude && !position.longitude && (
            <button
              className="absolute right-0 rounded-full bg-blue-400 px-2.5 py-3 text-sm md:text-base"
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault()
                dispatch(fetchAddress())
              }}
            >
              Get Position
            </button>
          )}
        </div>

        {/* Priority Checkbox */}
        <div className="mb-6 flex space-x-3 text-sm font-semibold md:text-base">
          <input
            {...register('priority')}
            type="checkbox"
            className="w-5"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <p>Want to give your order priority?</p>
        </div>

        {/* Hidden Inputs for Order Calculation */}
        <input
          type="hidden"
          value={totalCartPrice}
          {...register('orderPrice')}
        />
        <input
          type="hidden"
          value={estimatedDelivery}
          {...register('estimatedDelivery')}
        />
        <input
          type="hidden"
          value={priorityPrice}
          {...register('priorityPrice')}
        />
        <input type="hidden" value={withPriority} {...register('priority')} />
        <input
          type="hidden"
          value={JSON.stringify(cart)}
          {...register('cart')}
        />
        <input
          type="hidden"
          value={
            position.latitude && position.longitude
              ? `${position.latitude},${position.longitude}`
              : ''
          }
          {...register('position')}
        />

        {/* Submit Button */}
        <Button disabled={isLoading}>
          {isLoading ? 'Placing Order' : `Order now for $${totalPrice}`}
        </Button>
      </form>
    </div>
  )
}

export default CreateOrder
