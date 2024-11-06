/*
V1 - options do not contain 'ALL'
*/
import { useEffect, useRef, useState } from "react"

export type SelectMultiCheckSearchOption = {
  label: string
  value: string | number
}

type SelectMultiCheckSearchProps = {
  value: SelectMultiCheckSearchOption[]
  onChange: (value: SelectMultiCheckSearchOption[]) => void
  options: SelectMultiCheckSearchOption[]
  closeDropdownOnSelect: boolean
  size?: 'SM' | 'MD' | 'LG'
  defaultValue?: null | 'ALL' | SelectMultiCheckSearchOption[]
}

export default function SelectMultiCheckSearch({ value, onChange, options, closeDropdownOnSelect, size = 'SM', defaultValue = null }: SelectMultiCheckSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isAll, setIsAll] = useState(false)
  const [search, setSearch] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<HTMLLIElement[]>([])

  const ALL = { label: 'ALL', value: 'ALL' }

  const optionsCopy = options
  const searchCopy = search
  let filteredOptions = optionsCopy?.filter((option: SelectMultiCheckSearchOption) => option.label.toLowerCase().includes(searchCopy.toLowerCase()))
  if (filteredOptions === undefined) {
    filteredOptions = []
  }

  // SM
  const sizeStyles = {
    minSelectHeight: 'min-h-[1.2rem]',
    textSize: 'text-[0.6rem]',
    clearBtnTextSize: 'text-[1rem]',
    upDownArrowSize: 'border-[0.25rem]',
    checkBoxSize: 'max-h-[7px] max-w-[7px] mx-[4px] my-[3px]'
  }
  if (size === 'MD') {
    sizeStyles.minSelectHeight = 'min-h-[1.5rem]'
    sizeStyles.textSize = 'text-[0.8rem]'
    sizeStyles.clearBtnTextSize = 'text-[1.25rem]'
    sizeStyles.upDownArrowSize = 'border-[0.25rem]'
    sizeStyles.checkBoxSize = 'max-h-[10px] max-w-[10px] mx-[6px] my-[5px]'
  }
  if (size === 'LG') {
    sizeStyles.minSelectHeight = 'min-h-[39.5px]'
    sizeStyles.textSize = 'text-[1rem]'
    sizeStyles.clearBtnTextSize = 'text-[1.4rem]'
    sizeStyles.upDownArrowSize = 'border-[0.35rem] mx-[1.5px]'
    sizeStyles.checkBoxSize = 'max-h-[11px] max-w-[11px] mx-[4px] my-[5px]'
  }

  const clearOptions = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    onChange([])
    setIsAll(false)
  }

  const selectOption = (option: SelectMultiCheckSearchOption) => {
    if (value.includes(option)) {
      onChange(value.filter(o => o !== option))
    } else {
      onChange([...value, option])
    }
  }

  const isOptionSelected = (option: SelectMultiCheckSearchOption) => {
    const itemFound = value?.find(selectedOption => selectedOption.value === option.value)
    if (itemFound) {
      return true
    } else {
      return false
    }
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
    if (defaultValue === null) {
      onChange([])
    }
    else if (defaultValue === 'ALL') {
      onChange(options)
    } else {
      onChange(defaultValue)
    }

  }, [])

  useEffect(() => {
    if (value?.length < options?.length) {
      setIsAll(false)
    }
    if (value?.length === options?.length && value?.length > 0 && options?.length > 0) {
      setIsAll(true)
    }
  }, [value?.length])

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
          if (newValue >= 0 && newValue < options?.length) {
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
          if (newValue >= 0 && newValue < options?.length) {
            setHighlightedIndex(newValue)
          }
          e.preventDefault()
          setSelectedIndex((prevIndex) => {
            const newIndex = (prevIndex === null ? 0 : Math.min(prevIndex + 1, options?.length - 1))
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
      className={`${sizeStyles.minSelectHeight} relative w-full bg-white border-[0.05rem] border-solid border-gray-600 rounded flex items-center gap-1 p-0 px-1 outline-none focus:border-blue-400`}
    >
      <span className={`${sizeStyles.textSize} flex-grow flex overflow-x-hidden gap-1 font-light text-left`}>
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
            {ALL.label} <span className={`${sizeStyles.textSize} text-gray-400 group-hover:text-red-700`}>&times;</span>
          </button> :
          value?.map(v => (// flex-wrap or overflow-x-hidden above
            <button
              key={v.value}
              className="group flex items-center text-gray-700 border-[0.05rem] border-solid border-gray-400 rounded py-[0.05rem] px-[0.15rem] gap-[0.15rem] cursor-pointer bg-none outline-none hover:border-red-700 focus:border-red-700 hover:bg-red-200 focus:bg-red-200"
              onClick={e => {
                e.stopPropagation()
                selectOption(v)
              }}
            >
              {v.label} <span className={`${sizeStyles.textSize} text-gray-400 group-hover:text-red-700`}>&times;</span>
            </button>
          ))}
      </span>
      <button onClick={(e) => { clearOptions(e) }} className={`${sizeStyles.clearBtnTextSize} text-gray-400 border-none outline-none p-0 hover:text-gray-700 focus:text-gray-700`}>&times;</button>
      <div className="bg-gray-400 w-[0.05rem] self-stretch"></div>
      <div className={`${isOpen ? 'border-b-gray-400 translate-y-[-30%]' : 'border-t-gray-400 translate-y-[25%]'} ${sizeStyles.upDownArrowSize} border-solid border-transparent translate-x-0`}></div>
      <ul ref={dropdownRef} className={`${isOpen ? 'block' : 'hidden'} m-0 p-0 max-h-[156px] w-full overflow-y-auto border-[0.05rem] border-solid border-gray-400 rounded absolute left-0 top-[calc(100%+0.25rem)] bg-white z-[100]`}>
        <li
          onClick={(e) => {
            e.stopPropagation()
          }}
          key={'SEARCH'}
          className={`${sizeStyles.textSize} font-light sticky top-0 grid grid-cols-[auto_48px]`}
        >
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value) }}
            className={`${sizeStyles.textSize} p-1 text-gray-500 font-[300] outline-none border-none`}
            type="text"
            placeholder="Search"
          />
          <button onClick={() => { setSearch('') }} className={`${sizeStyles.clearBtnTextSize} text-gray-400 border-none outline-none p-0 cursor-pointer bg-white z-[100] hover:text-gray-700 focus:text-gray-700`}>&times;</button>
        </li>
        <li
          onClick={(e) => {
            e.stopPropagation()
            isAll ? onChange([]) : onChange(options)
            setIsAll(prev => !prev)
            closeDropdownOnSelect ? setIsOpen(false) : setIsOpen(true)
          }}
          onMouseEnter={() => { setHighlightedIndex(0) }}
          key={ALL.value}
          className={`${isAll ? 'bg-gray-200' : ''} ${0 === highlightedIndex ? 'bg-gray-400' : ''} ${sizeStyles.textSize} p-1 cursor-pointer font-light grid grid-cols-[20px_auto]`}
        >
          <div className={`${isAll ? 'bg-gray-700' : 'bg-white'} ${sizeStyles.checkBoxSize} border-[0.05rem] border-solid border-gray-600`}></div>
          <div>{ALL.label}</div>
        </li>
        {filteredOptions?.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation()
              selectOption(option)
              closeDropdownOnSelect ? setIsOpen(false) : setIsOpen(true)
            }}
            onMouseEnter={() => { setHighlightedIndex(index + 1) }}
            key={option.value}
            ref={(el: HTMLLIElement) => itemRefs.current[index] = el}
            className={`${isOptionSelected(option) ? 'bg-gray-200' : ''} ${index + 1 === highlightedIndex ? 'bg-gray-400' : ''} ${sizeStyles.textSize} p-1 cursor-pointer font-light grid grid-cols-[20px_auto]`}
          >
            <div className={`${isOptionSelected(option) ? 'bg-gray-700' : 'bg-white'} ${sizeStyles.checkBoxSize} border-[0.05rem] border-solid border-gray-600`}></div>
            <div>{option.label}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}