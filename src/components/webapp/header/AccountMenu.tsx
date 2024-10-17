import { useState } from "react"
import { PiUserCircleLight } from "react-icons/pi"

export default function AccountMenu({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(false)

  function getInitials(email: string) {
    let initials = ''
    const fullName = email.split('@')[0]
    const fullNameArr = fullName.split('.')
    initials = fullNameArr[0][0].toUpperCase() + fullNameArr[1][0].toUpperCase()
    return initials
  }

  return (
    <div
      onClick={() => { setIsOpen(prev => !prev) }}
      onBlur={() => { setIsOpen(false) }}
      className="relative"
      tabIndex={0}
    >
      <div className="flex justify-center items-center p-2 cursor-pointer rounded-full bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.2)] transition">
        {email === '' ? <span className="text-[1.5rem]"><PiUserCircleLight /></span> : <span className="text-[1rem] font-light">{getInitials(email)}</span>}
      </div>
      <ul onClick={(e) => { e.stopPropagation() }} className={`${isOpen ? 'block' : 'hidden'} absolute right-0 top-[calc(100%+0.3rem)] m-0 bg-white w-[300px] z-[100] border border-solid border-gray-400 rounded-md shadow-md`}>
        <li className="cursor-pointer flex justify-start items-center p-1 rounded-md hover:bg-gray-100">
          <span className="mr-1 text-[1.1rem]"><PiUserCircleLight /></span>
          <span className="font-light text-[0.8rem]">{email}</span>
        </li>
      </ul>
    </div>
  );
}
