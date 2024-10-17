import { HomeNavItem } from "@/types/home/homeTypes"
import HomeListItem from "@/features/home/HomeListItem"

type HomeListProps = {
  navItems: HomeNavItem[]
}

export default function HomeList({ navItems }: HomeListProps) {
  return (
    <ul className="overflow-y-scroll mx-auto my-1 p-1 w-[60%] h-[calc(100vh-58px-4px-2px-16px)] bg-gray-200 shadow rounded">
      {navItems.map((navItem: HomeNavItem) => (
        <HomeListItem key={navItem.id} navItem={navItem} />
      ))}
    </ul>
  )
}
