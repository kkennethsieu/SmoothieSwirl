import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateName } from './userSlice'

function CreateUser() {
  const [username, setUsername] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()
    if (!username) return
    dispatch(updateName(username))
    navigate('/menu')
    setUsername('')
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <p className="mb-4 mt-4 text-lg text-white">
        Welcome! Please start by telling us your name:
      </p>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Enter Full Name"
        className="mx-auto mb-4 w-7/12 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring focus:ring-blue-500 sm:px-5 sm:py-1.5 sm:text-sm md:w-[300px] md:px-6 md:py-2 md:text-base lg:w-[350px]"
      />
      {username && (
        <button
          to="/menu"
          className="mx-auto mb-4 w-4/12 rounded-full bg-blue-600 px-4 py-2.5 text-sm uppercase text-white"
        >
          Order Now!
        </button>
      )}
    </form>
  )
}

export default CreateUser
