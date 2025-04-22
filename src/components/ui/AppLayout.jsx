import { Outlet } from 'react-router-dom'
import Header from './Header'
import CartFooter from '../features/cart/CartFooter'

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <div className="overflow-scroll bg-stone-100">
        <main className="mx-auto mt-2 max-w-3xl p-2">
          <Outlet />
        </main>
      </div>
      <CartFooter />
    </div>
  )
}

export default AppLayout
