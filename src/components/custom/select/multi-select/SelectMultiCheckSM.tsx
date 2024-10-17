/*
V1 - options do not contain 'ALL'
*/
import { useEffect, useRef, useState } from "react"

export type SelectMultiCheckSMOption = {
  label: string
  value: string | number
}

type SelectMultiCheckSMProps = {
  value: SelectMultiCheckSMOption[]
  onChange: (value: SelectMultiCheckSMOption[]) => void
  options: SelectMultiCheckSMOption[]
  closeDropdownOnSelect: boolean
}

export default function SelectMultiCheckSM({ value, onChange, options, closeDropdownOnSelect }: SelectMultiCheckSMProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isAll, setIsAll] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<HTMLLIElement[]>([])

  const ALL = { label: 'ALL', value: 'ALL' }

  const clearOptions = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    onChange([])
    setIsAll(false)
  }

  const selectOption = (option: SelectMultiCheckSMOption) => {
    if (value.includes(option)) {
      onChange(value.filter(o => o !== option))
    } else {
      onChange([...value, option])
    }
  }

  const isOptionSelected = (option: SelectMultiCheckSMOption) => {
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
    if (value.length < options.length) {
      setIsAll(false)
    }
    if (value.length === options.length) {
      setIsAll(true)
    }
  }, [value.length])

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
            if (isOpen) {
              if (highlightedIndex === 0) {
                isAll ? onChange([]) : onChange(options)
              } else {
                selectOption(options[highlightedIndex - 1])
              }
            }
          } else {
            setIsOpen(true)
            if (isOpen) {
              if (highlightedIndex === 0) {
                isAll ? onChange([]) : onChange(options)
              } else {
                selectOption(options[highlightedIndex - 1])
              }
            }
          }
          break
        // case "ArrowUp":
        // case "ArrowDown": {
        //   if (!isOpen) {
        //     setIsOpen(true)
        //     break
        //   }

        //   const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
        //   if (newValue >= 0 && newValue <= options.length) {
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
  }, [isOpen, highlightedIndex, options, closeDropdownOnSelect, isAll])

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
        {isAll ?
          <button
            key={ALL.value}
            className="group flex items-center text-gray-700 border-[0.05rem] border-solid border-gray-400 rounded py-[0.05rem] px-[0.15rem] gap-[0.15rem] cursor-pointer bg-none outline-none hover:border-red-700 focus:border-red-700 hover:bg-red-200 focus:bg-red-200"
            onClick={e => {
              e.stopPropagation()
              setIsAll(false)
              onChange([])
            }}
          >
            {ALL.label} <span className="text-[0.8rem] text-gray-400 group-hover:text-red-700">&times;</span>
          </button> :
          value.map(v => (// flex-wrap or overflow-x-hidden above
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
        <li
          onClick={(e) => {
            e.stopPropagation()
            isAll ? onChange([]) : onChange(options)
            setIsAll(prev => !prev)
            closeDropdownOnSelect ? setIsOpen(false) : setIsOpen(true)
          }}
          onMouseEnter={() => { setHighlightedIndex(0) }}
          key={ALL.value}
          className={`${isAll ? 'bg-gray-200' : ''} ${0 === highlightedIndex ? 'bg-gray-400' : ''} p-1 cursor-pointer text-[0.8rem] font-light grid grid-cols-[20px_auto]`}
        >
          <div className={`${isAll ? 'bg-gray-700' : 'bg-white'} border-[0.05rem] border-solid border-gray-600 max-h-[10px] max-w-[10px] mx-[6px] my-[5px]`}></div>
          <div>{ALL.label}</div>
        </li>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation()
              selectOption(option)
              closeDropdownOnSelect ? setIsOpen(false) : setIsOpen(true)
            }}
            onMouseEnter={() => { setHighlightedIndex(index + 1) }}
            key={option.value}
            ref={(el: HTMLLIElement) => itemRefs.current[index] = el}
            className={`${isOptionSelected(option) ? 'bg-gray-200' : ''} ${index + 1 === highlightedIndex ? 'bg-gray-400' : ''} p-1 cursor-pointer text-[0.8rem] font-light grid grid-cols-[20px_auto]`}
          >
            <div className={`${isOptionSelected(option) ? 'bg-gray-700' : 'bg-white'} border-[0.05rem] border-solid border-gray-600 max-h-[10px] max-w-[10px] mx-[6px] my-[5px]`}></div>
            <div>{option.label}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}