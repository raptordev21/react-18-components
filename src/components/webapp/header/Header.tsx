import ReactLogo from '@/assets/react.svg'
import { NAVIGATE } from '@/helpers/constants'
import { LiaHomeSolid } from 'react-icons/lia'
import { useNavigate } from 'react-router-dom'
import AccountMenu from '@/components/webapp/header/AccountMenu'

function Header() {
  const navigate = useNavigate()

  return (
    <header className='flex justify-between items-center bg-gray-100 m-1 py-1 px-2 h-[50px] border border-solid border-gray-300 rounded-lg'>
      <div className='w-[45px] flex justify-center items-center cursor-pointer'>
        <img
          className='ml-1 w-full'
          onClick={() => {
            navigate(NAVIGATE.HOME)
          }}
          src={ReactLogo}
          alt="Loreal Logo"
        />
      </div>
      <div>
        <button onClick={() => { navigate(NAVIGATE.HOME) }} className='flex flex-row justify-start items-center gap-1 p-1 px-2 rounded bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.2)] transition'>
          <LiaHomeSolid className='text-[1.35rem]' />
          <div className='flex flex-row justify-center items-center'><p className='text-[1.2rem] font-light'>HOME</p></div>
        </button>
      </div>
      <div className='flex flex-row justify-start items-center gap-1'>
        <AccountMenu email={'himanshu.choudhary@react.com'} />
      </div>
    </header>
  )
}

export default Header