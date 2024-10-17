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
    id: 1,
    name: 'Select Tree',
    icon: 'LiaUserCogSolid',
    url: '/select/select-tree',
  })

  return (
    <PageContainer menu={menuItems} />
  )
}
