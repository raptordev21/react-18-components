import MenuItem from "@/components/webapp/side-nav/MenuItem"
import FixedMenuItem from "./FixedMenuItem"

type Item = {
  id: number
  name: string
  icon: string
  url: string
}

type MenuListProps = {
  menu: Item[]
}

function MenuList({ menu }: MenuListProps) {
  return (
    <ul className="flex flex-col justify-start items-center h-full">
      <FixedMenuItem />
      {menu.map((item: Item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  )
}

export default MenuList