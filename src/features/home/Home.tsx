import { HomeNavItem } from "@/types/home/homeTypes"
import HomeList from "@/features/home/HomeList"
import { NAVIGATE } from "@/helpers/constants"


export default function Home() {
  const navItems: HomeNavItem[] = [
    {
      id: 1,
      name: "Select",
      url: NAVIGATE.SELECT_MULTI_TREE_SEARCH,
      desc: "Custom Single and Multi Select Components",
    },
    {
      id: 2,
      name: "Tree",
      url: "/select/tree",
      desc: "Custom Tree",
    },
  ]

  return (
    <main className="m-1 p-1 h-[calc(100vh-58px-4px)] bg-gray-100 border-[1px] border-solid border-gray-300 shadow rounded">
      <HomeList navItems={navItems} />
    </main>
  )
}
