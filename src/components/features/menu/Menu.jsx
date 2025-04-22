import MenuItem from './MenuItem'
import useGetMenu from './useGetMenu'
import Loader from '../../ui/Loader'

function Menu() {
  const { isLoading, data: menu } = useGetMenu()
  if (isLoading) return <Loader />
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((smoothie) => (
        <MenuItem smoothie={smoothie} key={smoothie.id} />
      ))}
    </ul>
  )
}

export default Menu
