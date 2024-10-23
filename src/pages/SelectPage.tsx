import PageContainer from '@/components/webapp/page/PageContainer'
import { NAVIGATE } from '@/helpers/constants'

export default function SelectPage() {
  const menuItems = []
  menuItems.push({
    id: 1,
    name: 'Select Multi Tree Search',
    icon: 'LiaUserCogSolid',
    url: NAVIGATE.SELECT_MULTI_TREE_SEARCH,
  })
  menuItems.push({
    id: 2,
    name: 'Select Tree Search',
    icon: 'LiaUserCogSolid',
    url: NAVIGATE.SELECT_TREE_SEARCH,
  })

  return (
    <PageContainer menu={menuItems} />
  )
}
