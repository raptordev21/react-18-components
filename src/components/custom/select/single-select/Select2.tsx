import { useEffect, useRef, useState } from "react"

type SelectProps = {
  value: string
  onChange: (value: string) => void
  options: string[]
  size?: 'SM' | 'MD' | 'LG'
}

export default function Select2({ value, onChange, options, size = 'SM' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false) // dropdown display
  const [highlightedIndex, setHighlightedIndex] = useState(0) // mouseover and arrow keys option selection
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null) // scroll up/down on arrow keys option selection

  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<HTMLLIElement[]>([])

  // SM
  const sizeStyles = {
    minSelectHeight: 'min-h-[1.2rem]',
    textSize: 'text-[0.6rem]',
    clearBtnTextSize: 'text-[1rem]',
    upDownArrowSize: 'border-[0.25rem]'
  }
  if (size === 'MD') {
    sizeStyles.minSelectHeight = 'min-h-[1.5rem]'
    sizeStyles.textSize = 'text-[0.8rem]'
    sizeStyles.clearBtnTextSize = 'text-[1.25rem]'
    sizeStyles.upDownArrowSize = 'border-[0.25rem]'
  }
  if (size === 'LG') {
    sizeStyles.minSelectHeight = 'min-h-[39.5px]'
    sizeStyles.textSize = 'text-[1rem]'
    sizeStyles.clearBtnTextSize = 'text-[1.4rem]'
    sizeStyles.upDownArrowSize = 'border-[0.35rem] mx-[1.5px]'
  }

  const clearOptions = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    onChange('')
  }

  const selectOption = (option: string) => {
    if (option !== value) onChange(option)
  }

  const isOptionSelected = (option: string) => {
    return option === value
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

  // update scroll height on selectedIndex change
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
          setIsOpen(prev => !prev)
          if (isOpen) selectOption(options[highlightedIndex])
          break
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
  }, [isOpen, highlightedIndex, options])

  return (
    <div
      ref={containerRef}
      onBlur={handleBlur}
      onClick={() => setIsOpen(prev => !prev)}
      tabIndex={0}
      className={`${sizeStyles.minSelectHeight} relative w-full bg-white border-[0.05rem] border-solid border-gray-600 rounded flex items-center gap-1 p-0 px-1 outline-none focus:border-blue-400`}
    >
      <span className={`${sizeStyles.textSize} flex-grow font-light text-left`}>{value}</span>
      <button onClick={(e) => { clearOptions(e) }} className={`${sizeStyles.clearBtnTextSize} text-gray-400 border-none outline-none p-0 hover:text-gray-700 focus:text-gray-700`}>&times;</button>
      <div className="bg-gray-400 w-[0.05rem] self-stretch"></div>
      <div className={`${isOpen ? 'border-b-gray-400 translate-y-[-30%]' : 'border-t-gray-400 translate-y-[25%]'} ${sizeStyles.upDownArrowSize} border-solid border-transparent translate-x-0`}></div>
      <ul ref={dropdownRef} className={`${isOpen ? 'block' : 'hidden'} m-0 p-0 max-h-[156px] w-full overflow-y-auto border-[0.05rem] border-solid border-gray-400 rounded absolute left-0 top-[calc(100%+0.25rem)] bg-white z-[100]`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation()
              selectOption(option)
              setIsOpen(false)
            }}
            onMouseEnter={() => { setHighlightedIndex(index) }}
            key={option}
            ref={(el: HTMLLIElement) => itemRefs.current[index] = el}
            className={`${isOptionSelected(option) ? 'bg-gray-200' : ''} ${index === highlightedIndex ? 'bg-gray-400' : ''} ${sizeStyles.textSize} p-1 cursor-pointer font-light text-left`}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  )
}