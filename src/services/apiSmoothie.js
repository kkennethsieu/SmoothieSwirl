import supabase from './supabase'

export async function getMenu() {
  const { data: menu, error } = await supabase.from('menu').select('*')
  console.log(menu)

  if (error) throw new Error('Error fetching menu')

  return menu
}

export async function getMenuItem(id) {
  const { data: menu, error } = await supabase
    .from('menu')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error('Error fetching menu item')

  return menu
}

export async function getOrder(id) {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq('orderId', id)
    .single()
  if (error) throw new Error('Error fetching order')

  return orders
}

export async function createOrder(newOrder) {
  const { data, error } = await supabase
    .from('orders')
    .insert([newOrder])
    .select()

  if (error) {
    console.error(error)
    throw new Error('Error creating order')
  }

  return data
}

export async function updateOrder({
  orderId,
  priority,
  priorityPrice,
  orderPrice,
}) {
  const { data, error } = await supabase
    .from('orders')
    .update({ priority, priorityPrice, orderPrice })
    .eq('orderId', orderId)

  if (error) {
    console.error(error)
    throw new Error('Error creating order')
  }

  return data
}
