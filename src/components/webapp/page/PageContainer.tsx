import { Outlet } from 'react-router-dom'
import Header from '@/components/webapp/header/Header'
import { useSelector } from 'react-redux'
import { selectSideNav } from '@/features/home/homeSlice'
import SideNav from '@/components/webapp/side-nav/SideNav'

type Item = {
  id: number
  name: string
  icon: string
  url: string
}

type PageContainerProps = {
  menu: Item[]
}

function PageContainer({ menu }: PageContainerProps) {
  const nav = useSelector(selectSideNav)

  return (
    <div className="h-screen w-screen">
      <div className="">
        <div>
          <Header />
        </div>
        <div className={`h-[calc(100vh-58px)] grid ${nav ? 'grid-cols-[280px_auto]' : 'grid-cols-[52px_auto]'}`}>
          <SideNav menu={menu} />
          <main className='overflow-y-hidden h-[calc(100%-4px)] w-[calc(100%-8px)] border border-solid border-gray-300 rounded-lg m-1 mt-0 shadow-md'>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default PageContainer