import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppLayout from './components/ui/AppLayout'
import Home from './components/ui/Home'
import Error from './components/ui/Error'

import Menu from './components/features/menu/Menu'
import Cart from './components/features/cart/Cart'
import CreateOrder from './components/features/order/CreateOrder'
import Order from './components/features/order/Order'
import MenuItemDetails from './components/features/menu/MenuItemDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<AppLayout />}>
            <Route path="menu" element={<Menu />} />
            <Route path="menu/:menuId" element={<MenuItemDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders/new" element={<CreateOrder />} />
            <Route path="orders/:orderId" element={<Order />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
