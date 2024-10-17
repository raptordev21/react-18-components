import MenuList from '@/components/webapp/side-nav/MenuList'

type Item = {
  id: number
  name: string
  icon: string
  url: string
}

type SideNavProps = {
  menu: Item[]
}

export default function SideNav({ menu }: SideNavProps) {
  return (
    <nav className='block border border-solid border-gray-300 rounded-lg m-1 mt-0 mr-0 shadow-md custom-scroll'>
      <MenuList menu={menu} />
    </nav>
  )
}