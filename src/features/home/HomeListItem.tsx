import { NAVIGATE } from "@/helpers/constants"
import { HomeNavItem } from "@/types/home/homeTypes"
import { useNavigate } from 'react-router-dom'

type HomeListItemProps = {
  navItem: HomeNavItem
}

export default function HomeListItem({ navItem }: HomeListItemProps) {
  const navigate = useNavigate()

  return (
    <li
      onClick={() => { navigate(NAVIGATE.SELECT_MULTI_TREE_SEARCH) }}
      className="m-1 mb-2 p-1 bg-gray-300 hover:bg-gray-400 transition shadow rounded cursor-pointer"
    >
      <header className="text-[1.5rem] text-gray-700">{navItem.name}</header>
      <section className="font-light">{navItem.desc}</section>
    </li>
  )
}
