import { useCallback, useEffect, useRef, useState } from "react"
import { PiCaretDownLight, PiCaretUpLight } from "react-icons/pi"
import { onChange, SelectMultiTreeSearchOption, SelectMultiTreeSearchOptions } from "./SelectMultiTreeSearchTypes"
import {
  applySelectionsToTreeById,
  getCheckColor,
  getHighestParentsSelected,
  getSelectionType,
  setSelectionsToKey
} from "./SelectMultiTreeSearchHelpers"

type SelectMultiTreeSearchProps = {
  tree: SelectMultiTreeSearchOptions
  onChange: onChange
  options: SelectMultiTreeSearchOptions
  size?: 'SM' | 'MD' | 'LG'
}

export default function SelectMultiTreeSearch({ tree, onChange, options, size = 'SM' }: SelectMultiTreeSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAll, setIsAll] = useState(false)
  const [search, setSearch] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)

  const values = getHighestParentsSelected(tree)

  const optionsCopy = options
  const searchCopy = search
  let filteredOptions = optionsCopy?.filter((option: SelectMultiTreeSearchOption) => option.value.toLowerCase().includes(searchCopy.toLowerCase()))
  if (filteredOptions === undefined) {
    filteredOptions = []
  }

  // SM
  const sizeStyles = {
    minSelectHeight: 'min-h-[1.2rem]',
    textSize: 'text-[0.6rem]',
    clearBtnTextSize: 'text-[1rem]',
    upDownArrowSize: 'border-[0.25rem]',
    checkBoxSize: 'min-h-[7px] min-w-[7px]'
  }
  if (size === 'MD') {
    sizeStyles.minSelectHeight = 'min-h-[1.5rem]'
    sizeStyles.textSize = 'text-[0.8rem]'
    sizeStyles.clearBtnTextSize = 'text-[1.25rem]'
    sizeStyles.upDownArrowSize = 'border-[0.25rem]'
    sizeStyles.checkBoxSize = 'min-h-[10px] min-w-[10px]'
  }
  if (size === 'LG') {
    sizeStyles.minSelectHeight = 'min-h-[39.5px]'
    sizeStyles.textSize = 'text-[1rem]'
    sizeStyles.clearBtnTextSize = 'text-[1.4rem]'
    sizeStyles.upDownArrowSize = 'border-[0.35rem] mx-[1.5px]'
    sizeStyles.checkBoxSize = 'min-h-[11px] min-w-[11px]'
  }

  const handleSelection = (options: SelectMultiTreeSearchOptions, targetId: string, selection: 'SELECTED' | 'NOT-SELECTED' | 'CHILD-SELECTED') => {
    const newOptions = applySelectionsToTreeById(options, targetId, getSelectionType(selection))
    onChange([...newOptions])
  }

  const selectAllOptions = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    onChange(setSelectionsToKey(options, "SELECTED"))
  }

  const clearOptions = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    onChange(setSelectionsToKey(options, "NOT-SELECTED"))
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
          break
        case "ArrowUp": {
          if (!isOpen) {
            setIsOpen(true)
            break
          }
          break
        }
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true)
            break
          }
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
      <span className={`${sizeStyles.textSize} flex-grow flex overflow-x-hidden gap-1 font-light text-left`}>
        {isAll ?
          <button
            key={'ALL'}
            className="group flex items-center text-gray-700 border-[0.05rem] border-solid border-gray-400 rounded py-[0.05rem] px-[0.15rem] gap-[0.15rem] cursor-pointer bg-none outline-none hover:border-red-700 focus:border-red-700 hover:bg-red-200 focus:bg-red-200"
            onClick={e => {
              e.stopPropagation()
              setIsAll(false)
              onChange([])
            }}
          >
            {'ALL'} <span className={`${sizeStyles.textSize} text-gray-400 group-hover:text-red-700`}>&times;</span>
          </button> :
          values?.map(v => (// flex-wrap or overflow-x-hidden above
            <button
              key={v.id}
              className="group flex items-center text-gray-700 border-[0.05rem] border-solid border-gray-400 rounded py-[0.05rem] px-[0.15rem] gap-[0.15rem] cursor-pointer bg-none outline-none hover:border-red-700 focus:border-red-700 hover:bg-red-200 focus:bg-red-200"
              onClick={e => {
                e.stopPropagation()
                handleSelection(options, v.id, 'SELECTED')
              }}
            >
              {v.value} <span className={`${sizeStyles.textSize} text-gray-400 group-hover:text-red-700`}>&times;</span>
            </button>
          ))}
      </span>
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
        <div
          className='ml-12 cursor-pointer text-[0.6rem] font-light text-gray-500 hover:text-gray-900 hover:font-[500] hover:bg-gray-100'
          onClick={selectAllOptions}
        >
          ALL
        </div>
        <Tree data={filteredOptions} onSelect={onChange} sizeStyles={sizeStyles} />
      </div>
    </div>
  )
}

// Recursive TreeNode Component
function TreeNode({ options, node, onSelect, sizeStyles }: { options: SelectMultiTreeSearchOptions, node: SelectMultiTreeSearchOption, onSelect: onChange, sizeStyles: Record<string, string> }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()
    setIsOpen(!isOpen);
  }

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
            const newOptions = applySelectionsToTreeById(options, node.id, getSelectionType(node.selection))
            onSelect([...newOptions])
          }}
          className="flex flex-row flex-grow justify-start items-center gap-2 cursor-pointer hover:bg-gray-100"
        >
          <div className={`${getCheckColor(node.selection)} ${sizeStyles.checkBoxSize} border-[0.05rem] border-solid border-gray-600`}></div>
          <div className={`${sizeStyles.textSize} cursor-pointer flex-grow font-light text-gray-500 hover:text-gray-900 hover:font-[500]`}>
            {node.value}
          </div>
        </div>
      </div>

      {/* Render the children recursively */}
      {isOpen && node.children && (
        <div>
          {node.children.map((child: SelectMultiTreeSearchOption, index: number) => (
            <TreeNode key={index} options={options} node={child} onSelect={onSelect} sizeStyles={sizeStyles} />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Tree Component
function Tree({ data, onSelect, sizeStyles }: { data: SelectMultiTreeSearchOptions, onSelect: onChange, sizeStyles: Record<string, string> }) {
  return (
    <div onClick={(e) => { e.stopPropagation() }} >
      {data.map((node, index) => (
        <TreeNode key={index} options={data} node={node} onSelect={onSelect} sizeStyles={sizeStyles} />
      ))}
    </div>
  );
};
