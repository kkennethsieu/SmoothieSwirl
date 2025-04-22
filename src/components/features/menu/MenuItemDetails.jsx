import { Link, useParams } from 'react-router-dom'
import MenuItemDetailFooter from './MenuItemDetailFooter'
import Button from '../../ui/Button'
import useGetMenuItem from './useGetMenuItem'
import Loader from '../../ui/Loader'

function MenuItemDetails() {
  const { menuId } = useParams()
  const { isLoading, data: menuItem } = useGetMenuItem(menuId)
  if (isLoading) return <Loader />
  const { name, unitPrice, imageUrl, ingredients, soldOut, description } =
    menuItem

  return (
    <div className="m-2 mx-auto flex max-w-4xl flex-col space-y-6 p-3">
      <Link
        to="/menu"
        className="text-sm text-blue-500 transition-all hover:text-blue-700"
      >
        &larr; Back to menu
      </Link>

      <img
        src={imageUrl}
        alt={name}
        className="mx-auto h-64 w-auto rounded-lg object-cover shadow-lg"
      />

      <div className="flex flex-col space-y-4 px-6">
        <h3 className="text-xl font-semibold text-gray-800 lg:text-2xl">
          {name}
        </h3>
        <p className="text-sm font-medium text-gray-600 lg:text-lg">
          ${unitPrice.toFixed(2)}
        </p>
        {!soldOut && (
          <div className="space-x-1.5">
            <Button>S</Button>
            <Button>M</Button>
            <Button>L</Button>
          </div>
        )}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-gray-700 lg:text-xl">
            Ingredients
          </h4>
          <p className="text-sm capitalize text-gray-600 lg:text-base">
            {ingredients}
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-gray-700 lg:text-xl">
            Description
          </h4>
          <p className="text-sm text-gray-600 lg:text-base">{description}</p>
        </div>
        {soldOut ? (
          <p className="text-sm font-semibold md:text-base">Sold Out</p>
        ) : (
          <MenuItemDetailFooter price={unitPrice} smoothie={menuItem} />
        )}
      </div>
    </div>
  )
}

export default MenuItemDetails
