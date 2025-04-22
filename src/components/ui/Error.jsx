import { Link, useNavigate, useRouteError } from 'react-router-dom'

function Error() {
  const error = useRouteError()
  const navigate = useNavigate()

  function handleClick(e) {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.mesesage}</p>
      <Link onClick={handleClick}>&larr; Go back</Link>
    </div>
  )
}

export default Error
