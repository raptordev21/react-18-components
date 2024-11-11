import { useCallback, useEffect, useRef, useState } from "react"
import { PiCaretDownLight, PiCaretUpLight } from "react-icons/pi"

export type SelectTreeSearchOption = {
  value: string;
  children: SelectTreeSearchOption[];
};

export type SelectTreeSearchOptions = SelectTreeSearchOption[];

type onChange = (value: SelectTreeSearchOption | null) => void

type SelectTreeSearchProps = {
  value?: SelectTreeSearchOption | null
  onChange: onChange
  options: SelectTreeSearchOptions
  size?: 'SM' | 'MD' | 'LG'
}

export default function SelectTreeSearch({ value, onChange, options, size = 'SM' }: SelectTreeSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)

  const optionsCopy = options
  const searchCopy = search
  const filteredOptions = searchInHierarchy(optionsCopy, searchCopy)

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

  function searchInHierarchy(data: SelectTreeSearchOption[], searchTerm: string) {
    const result = []

    function searchNode(node: SelectTreeSearchOption) {
      if (node.value.toLowerCase().includes(searchTerm.toLowerCase())) return true

      if (node.children) {
        for (const child of node.children) {
          if (searchNode(child)) return true
        }
      }

      return false
    }

    for (const node of data) {
      if (searchNode(node)) {
        result.push(node)
      }
    }

    return result
  }

  const clearOptions = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    onChange(null)
  }

  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (isOpen) {
      if (!containerRef.current?.contains(e.relatedTarget as Node)) {
        setIsOpen(false);
      }
    }
  }, [isOpen]);

  const handleClick = useCallback((e: MouseEvent) => {
    if (isOpen && containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [handleClick])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen(prev => !prev)
          // if (isOpen) selectOption(options[highlightedIndex])
          break
        case "ArrowUp": {
          if (!isOpen) {
            setIsOpen(true)
            break
          }

          // const newValue = highlightedIndex + (e.code === "ArrowUp" ? -1 : 1)
          // if (newValue >= 0 && newValue < options.length) {
          //   setHighlightedIndex(newValue)
          // }
          // e.preventDefault()
          // setSelectedIndex((prevIndex) => {
          //   const newIndex = (prevIndex === null ? 0 : Math.max(prevIndex - 1, 0))
          //   return newIndex
          // })
          break
        }
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true)
            break
          }

          // const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
          // if (newValue >= 0 && newValue < options.length) {
          //   setHighlightedIndex(newValue)
          // }
          // e.preventDefault()
          // setSelectedIndex((prevIndex) => {
          //   const newIndex = (prevIndex === null ? 0 : Math.min(prevIndex + 1, options.length - 1))
          //   return newIndex
          // })
          break
        }
        case "Escape":
          setIsOpen(false)
          break
      }
    }
    const containerRefCurrent = containerRef.current
    containerRefCurrent?.addEventListener("keydown", handler)

    return () => {
      containerRefCurrent?.removeEventListener("keydown", handler)
    }
  }, [isOpen, options])

  return (
    <div
      ref={containerRef}
      onBlur={handleBlur}
      onClick={() => setIsOpen(prev => !prev)}
      tabIndex={0}
      className="relative w-full min-h-[1.2rem] bg-white border-[0.05rem] border-solid border-gray-600 rounded flex items-center gap-1 p-0 px-1 outline-none focus:border-blue-400"
    >
      <span className="flex-grow text-[0.6rem] font-light text-left">{value?.value}</span>
      <button onClick={(e) => { clearOptions(e) }} className="text-gray-400 border-none outline-none p-0 text-[1rem] hover:text-gray-700 focus:text-gray-700">&times;</button>
      <div className="bg-gray-400 w-[0.05rem] self-stretch"></div>
      <div className={`${isOpen ? 'border-b-gray-400 translate-y-[-30%]' : 'border-t-gray-400 translate-y-[25%]'} border-[0.25rem] border-solid border-transparent translate-x-0`}></div>
      <div className={`${isOpen ? 'block' : 'hidden'} m-0 p-0 max-h-[156px] w-full overflow-y-auto border-[0.05rem] border-solid border-gray-400 rounded absolute left-0 top-[calc(100%+0.25rem)] bg-white z-[100]`}>
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          key={'SEARCH'}
          className={`${sizeStyles.textSize} font-light sticky top-0 grid grid-cols-[auto_48px] border-b-[0.05rem] border-solid border-gray-400`}
        >
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value) }}
            className={`${sizeStyles.textSize} p-1 text-gray-500 font-[300] outline-none border-none`}
            type="text"
            placeholder="Search"
          />
          <button onClick={() => { setSearch('') }} className={`${sizeStyles.clearBtnTextSize} text-gray-400 border-none outline-none p-0 hover:text-gray-700 focus:text-gray-700`}>&times;</button>
        </div>
        <Tree data={filteredOptions} onSelect={onChange} search={search} />
      </div>
    </div>
  )
}

// Recursive TreeNode Component
function TreeNode({ node, onSelect, search }: { node: SelectTreeSearchOption, onSelect: onChange, search: string }) {
  const [isOpen, setIsOpen] = useState(false);

  let searchHighlight = false
  if (search.length > 0) {
    if (node.value.toLowerCase().includes(search.toLowerCase())) {
      searchHighlight = true
    }
  }

  const handleToggle = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (search.length > 0) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }

  }, [search.length])

  return (
    <div className='ml-6'>
      {/* Render the node's value */}
      <div className='flex flex-row justify-start items-center gap-2'>
        {node.children && node.children.length > 0 && (
          <span onClick={handleToggle} className='cursor-pointer'>
            {isOpen ? <PiCaretUpLight /> : <PiCaretDownLight />}
          </span>
        )}
        {node.children && node.children.length === 0 && (
          <div className='w-4 h-4'></div>
        )}
        <div
          onClick={(e) => {
            e.stopPropagation()
            onSelect(node)
          }}
          className={`${searchHighlight ? "bg-gray-100" : ''} flex flex-row flex-grow justify-start items-center gap-0 cursor-pointer hover:bg-gray-100`}
        >
          <div className={`${searchHighlight ? 'text-gray-900 font-[500]' : ''} cursor-pointer flex-grow text-[0.6rem] font-light text-gray-500 hover:text-gray-900 hover:font-[500]`}>
            {node.value}
          </div>
        </div>
      </div>

      {/* Render the children recursively */}
      {isOpen && node.children && (
        <div>
          {node.children.map((child: SelectTreeSearchOption, index: number) => (
            <TreeNode key={index} node={child} onSelect={onSelect} search={search} />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Tree Component
function Tree({ data, onSelect, search }: { data: SelectTreeSearchOptions, onSelect: onChange, search: string }) {
  return (
    <div onClick={(e) => { e.stopPropagation() }} >
      {data.map((node, index) => (
        <TreeNode key={index} node={node} onSelect={onSelect} search={search} />
      ))}
    </div>
  );
};
