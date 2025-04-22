import CartFooter from '../features/cart/CartFooter'
import CreateUser from '../features/user/CreateUser'
import Header from './Header'

function Home() {
  return (
    <div>
      <Header />
      <div className="relative flex h-screen w-screen flex-col items-center justify-start bg-hero-pattern bg-cover p-5 text-center">
        <div className="absolute inset-0 z-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col drop-shadow-lg">
          <h2 className="mt-[100px] text-2xl font-bold text-white">
            <span className="text-cyan-300">
              Fresh, vibrant, and full of flavor.
            </span>
            <br />
            Blended to perfection, delivered to your door. <br />
            Keep the <span className="text-cyan-300">smoothies flowing</span>
          </h2>
          <CreateUser />
        </div>
      </div>
      <CartFooter />
    </div>
  )
}

export default Home
