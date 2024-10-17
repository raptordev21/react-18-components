import { MdDehaze } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from "@/app/store";
import { selectSideNav, updateSideNav } from '@/features/home/homeSlice'

function FixedMenuItem() {
  const nav = useSelector(selectSideNav)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <li className='cursor-pointer w-full font-normal'>
      <div onClick={() => { dispatch(updateSideNav({ status: !nav })) }} className="rounded-t-lg p-2 w-full flex flex-row justify-start items-center hover:bg-slate-200">
        <div className='text-[1.8rem] mr-2 flex flex-row justify-start items-center'>
          <MdDehaze />
        </div>
        <div className={nav ? 'text-[1rem] mr-2 flex flex-row justify-start items-center' : 'hidden'}></div>
      </div>
    </li>
  )
}

export default FixedMenuItem