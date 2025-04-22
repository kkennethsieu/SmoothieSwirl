import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const username = useSelector((state) => state.user.username)

  const [query, setQuery] = useState('')

  const lowerCaseQuery = query.toLowerCase()

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!query) return
    navigate(`/orders/${lowerCaseQuery}`)
    setQuery('')
  }
  return (
    <header className="flex h-14 border-b border-stone-500 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 sm:h-16 md:h-20">
      <div className="m-3 flex w-full items-center justify-between">
        <Link to="/" className="w-[85px] p-2 sm:w-[95px] md:w-[135px]">
          <img src="../../public/assets/smoothie.png" />
        </Link>
        <form onSubmit={handleSubmit}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search Order #"
            className="mx-auto w-[200px] rounded-full px-3 py-2 text-xs focus:outline-none focus:ring focus:ring-blue-500 sm:px-5 sm:py-1.5 sm:text-sm md:w-[300px] md:px-6 md:py-2 md:text-base lg:w-[350px]"
          />
        </form>
        {username && (
          <p className="mx-3 text-sm font-bold capitalize text-white sm:text-xl md:text-xl">
            {username}
          </p>
        )}
      </div>
    </header>
  )
}

export default Header
