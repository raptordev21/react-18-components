import { useEffect, useRef, useState } from "react"

export type SelectMultiSMOption = {
  label: string
  value: string | number
}

type SelectMultiSMProps = {
  value: SelectMultiSMOption[]
  onChange: (value: SelectMultiSMOption[]) => void
  options: SelectMultiSMOption[]
  closeDropdownOnSelect: boolean
}

export default function SelectMultiSM({ value, onChange, options, closeDropdownOnSelect }: SelectMultiSMProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<HTMLLIElement[]>([])

  const clearOptions = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    onChange([])
  }

  const selectOption = (option: SelectMultiSMOption) => {
    if (value.includes(option)) {
      onChange(value.filter(o => o !== option))
    } else {
      onChange([...value, option])
    }
  }

  const isOptionSelected = (option: SelectMultiSMOption) => {
    return value.includes(option)
  }

  const handleBlur = (e: any) => {
    if (isOpen) {
      if (!containerRef.current?.contains(e.relatedTarget)) {
        setIsOpen(false)
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleBlur)

    return () => {
      document.removeEventListener('click', handleBlur)
    }
  }, [])

  useEffect(() => {
    if (selectedIndex !== null && itemRefs.current[selectedIndex]) {
      const item = itemRefs.current[selectedIndex]
      if (dropdownRef.current !== null) {
        const dropdown = dropdownRef.current
        dropdown.scrollTop = item.offsetTop - (dropdown.clientHeight / 2) + (item.clientHeight / 2)
      }
    }
  }, [selectedIndex])

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return
      switch (e.code) {
        case "Enter":
        case "Space":
          if (closeDropdownOnSelect) {
            setIsOpen(prev => !prev)
            if (isOpen) selectOption(options[highlightedIndex])
          } else {
            setIsOpen(true)
            if (isOpen) selectOption(options[highlightedIndex])
          }
          break
        // case "ArrowUp":
        // case "ArrowDown": {
        //   if (!isOpen) {
        //     setIsOpen(true)
        //     break
        //   }

        //   const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
        //   if (newValue >= 0 && newValue < options.length) {
        //     setHighlightedIndex(newValue)
        //   }
        //   break
        // }
        case "ArrowUp": {
          if (!isOpen) {
            setIsOpen(true)
            break
          }

          const newValue = highlightedIndex + (e.code === "ArrowUp" ? -1 : 1)
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue)
          }
          e.preventDefault()
          setSelectedIndex((prevIndex) => {
            const newIndex = (prevIndex === null ? 0 : Math.max(prevIndex - 1, 0))
            return newIndex
          })
          break
        }
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true)
            break
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue)
          }
          e.preventDefault()
          setSelectedIndex((prevIndex) => {
            const newIndex = (prevIndex === null ? 0 : Math.min(prevIndex + 1, options.length - 1))
            return newIndex
          })
          break
        }
        case "Escape":
          setIsOpen(false)
          break
      }
    }
    containerRef.current?.addEventListener("keydown", handler)

    return () => {
      containerRef.current?.removeEventListener("keydown", handler)
    }
  }, [isOpen, highlightedIndex, options, closeDropdownOnSelect])

  return (
    <div
      ref={containerRef}
      // onBlur={() => setIsOpen(false)}
      onBlur={handleBlur}
      onClick={() => setIsOpen(prev => !prev)}
      tabIndex={0}
      className="relative w-full min-h-[1.5rem] border-[0.05rem] border-solid border-gray-600 rounded flex items-center gap-1 p-0 px-1 outline-none focus:border-blue-400"
    >
      <span className="flex-grow flex overflow-x-hidden gap-1 text-[0.8rem] font-light text-left">
        {value.map(v => (// flex-wrap or overflow-x-hidden above
          <button
            key={v.value}
            className="group flex items-center text-gray-700 border-[0.05rem] border-solid border-gray-400 rounded py-[0.05rem] px-[0.15rem] gap-[0.15rem] cursor-pointer bg-none outline-none hover:border-red-700 focus:border-red-700 hover:bg-red-200 focus:bg-red-200"
            onClick={e => {
              e.stopPropagation()
              selectOption(v)
            }}
          >
            {v.label} <span className="text-[0.8rem] text-gray-400 group-hover:text-red-700">&times;</span>
          </button>
        ))}
      </span>
      <button onClick={(e) => { clearOptions(e) }} className="text-gray-400 border-none outline-none p-0 text-[1.25rem] hover:text-gray-700 focus:text-gray-700">&times;</button>
      <div className="bg-gray-400 w-[0.05rem] self-stretch"></div>
      <div className={`${isOpen ? 'border-b-gray-400 translate-y-[-30%]' : 'border-t-gray-400 translate-y-[25%]'} border-[0.25rem] border-solid border-transparent translate-x-0`}></div>
      <ul ref={dropdownRef} className={`${isOpen ? 'block' : 'hidden'} m-0 p-0 max-h-[156px] w-full overflow-y-auto border-[0.05rem] border-solid border-gray-400 rounded absolute left-0 top-[calc(100%+0.25rem)] bg-white z-[100]`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation()
              selectOption(option)
              closeDropdownOnSelect ? setIsOpen(false) : setIsOpen(true)
            }}
            onMouseEnter={() => { setHighlightedIndex(index) }}
            key={option.value}
            ref={(el: HTMLLIElement) => itemRefs.current[index] = el}
            className={`${isOptionSelected(option) ? 'bg-gray-200' : ''} ${index === highlightedIndex ? 'bg-gray-400' : ''} p-1 cursor-pointer text-[0.8rem] font-light text-left`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}