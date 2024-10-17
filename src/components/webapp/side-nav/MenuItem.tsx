import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectSideNav } from '@/features/home/homeSlice'

import { AiOutlineForm, AiOutlineAppstoreAdd } from 'react-icons/ai'
import { BsClipboardCheck, BsCheck2Square, BsBroadcast, BsInboxes, BsBox } from 'react-icons/bs'
import { MdOutlineSpaceDashboard, MdMobileFriendly, MdOutlineNotificationsActive, MdOutlinePrecisionManufacturing } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { LiaUserCogSolid, LiaEdit } from 'react-icons/lia'
import { CgFileDocument } from 'react-icons/cg'
import { PiSignIn, PiChatsLight, PiUserCircleGear, PiUsersFour, PiTruck, PiShareNetwork, PiPackage, PiGraph } from 'react-icons/pi'
import { VscAdd, VscNotebook, VscBook, VscGraph, VscSettingsGear, VscGraphLine, VscGraphScatter } from 'react-icons/vsc'
import { BiCommentError } from 'react-icons/bi'
import { GrCatalog } from 'react-icons/gr'
import { FiUserCheck } from 'react-icons/fi'
import { GoHistory } from 'react-icons/go'
import { CiDark, CiCircleList } from 'react-icons/ci'
import { HiLanguage } from 'react-icons/hi2'
import { IoMdGlobe } from 'react-icons/io'

type Item = {
  id: number
  name: string
  icon: string
  url: string
}

type MenuItemProps = {
  item: Item
}

function MenuItem({ item }: MenuItemProps) {
  const nav = useSelector(selectSideNav)

  return (
    <li className='cursor-pointer w-full font-normal'>
      <NavLink
        to={item.url}
        className={({ isActive }) => {
          return `p-2 w-full flex flex-row justify-start items-center ${isActive ? 'bg-[#e3a535]' : 'hover:bg-slate-200'}`
        }}
      >
        <div className='text-[1.8rem] mr-2 flex flex-row justify-start items-center'>
          {item.icon === "MdOutlineSpaceDashboard" ? <MdOutlineSpaceDashboard /> : null}
          {item.icon === "AiOutlineForm" ? <AiOutlineForm /> : null}
          {item.icon === "FaWpforms" ? <FaWpforms /> : null}
          {item.icon === "LiaUserCogSolid" ? <LiaUserCogSolid /> : null}
          {item.icon === "CgFileDocument" ? <CgFileDocument /> : null}
          {item.icon === "BsClipboardCheck" ? <BsClipboardCheck /> : null}
          {item.icon === "PiChatsLight" ? <PiChatsLight /> : null}
          {item.icon === "BsCheck2Square" ? <BsCheck2Square /> : null}
          {item.icon === "VscAdd" ? <VscAdd /> : null}
          {item.icon === "VscNotebook" ? <VscNotebook /> : null}
          {item.icon === "VscBook" ? <VscBook /> : null}
          {item.icon === "BiCommentError" ? <BiCommentError /> : null}
          {item.icon === "GrCatalog" ? <GrCatalog /> : null}
          {item.icon === "MdMobileFriendly" ? <MdMobileFriendly /> : null}
          {item.icon === "FiUserCheck" ? <FiUserCheck /> : null}
          {item.icon === "PiUserCircleGear" ? <PiUserCircleGear /> : null}
          {item.icon === "PiUsersFour" ? <PiUsersFour /> : null}
          {item.icon === "GoHistory" ? <GoHistory /> : null}
          {item.icon === "BsBroadcast" ? <BsBroadcast /> : null}
          {item.icon === "MdOutlineNotificationsActive" ? <MdOutlineNotificationsActive /> : null}
          {item.icon === "VscGraph" ? <VscGraph /> : null}
          {item.icon === "VscSettingsGear" ? <VscSettingsGear /> : null}
          {item.icon === "CiDark" ? <CiDark /> : null}
          {item.icon === "HiLanguage" ? <HiLanguage /> : null}
          {item.icon === "AiOutlineAppstoreAdd" ? <AiOutlineAppstoreAdd /> : null}
          {item.icon === "BsInboxes" ? <BsInboxes /> : null}
          {item.icon === "BsBox" ? <BsBox /> : null}
          {item.icon === "IoMdGlobe" ? <IoMdGlobe /> : null}
          {item.icon === "MdOutlinePrecisionManufacturing" ? <MdOutlinePrecisionManufacturing /> : null}
          {item.icon === "PiTruck" ? <PiTruck /> : null}
          {item.icon === "PiShareNetwork" ? <PiShareNetwork /> : null}
          {item.icon === "PiPackage" ? <PiPackage /> : null}
          {item.icon === "VscGraphLine" ? <VscGraphLine /> : null}
          {item.icon === "PiGraph" ? <PiGraph /> : null}
          {item.icon === "VscGraphScatter" ? <VscGraphScatter /> : null}
          {item.icon === "CiCircleList" ? <CiCircleList /> : null}
          {item.icon === "LiaEdit" ? <LiaEdit /> : null}
          {item.icon === "PiSignIn" ? <PiSignIn /> : null}
        </div>
        <div className={nav ? 'text-[1rem] mr-2 flex flex-row justify-start items-center' : 'hidden'}>{item.name}</div>
      </NavLink>
    </li>
  )
}

export default MenuItem