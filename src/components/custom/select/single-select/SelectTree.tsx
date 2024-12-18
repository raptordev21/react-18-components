import { useEffect, useRef, useState } from "react"
import { PiCaretDownLight, PiCaretUpLight } from "react-icons/pi"

type SelectTreeProps = {
  value?: any
  onChange: (value: any) => void
  options: any
}

export default function SelectTree({ value, onChange, options }: SelectTreeProps) {
  const [isOpen, setIsOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const clearOptions = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    onChange(null)
  }

  // const selectOption = (option: any) => {
  //   if (option !== value) onChange(option)
  // }

  // const isOptionSelected = (option: any) => {
  //   return option === value
  // }

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
    containerRef.current?.addEventListener("keydown", handler)

    return () => {
      containerRef.current?.removeEventListener("keydown", handler)
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
        <Tree data={options} onSelect={onChange} />
      </div>
    </div>
  )
}

// Recursive TreeNode Component
function TreeNode({ node, onSelect }: { node: any, onSelect: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e: any) => {
    e.stopPropagation()
    setIsOpen(!isOpen);
  };

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
          className='cursor-pointer text-[0.6rem] font-light text-gray-500 hover:text-gray-900'
        >
          {node.value}
        </div>
      </div>

      {/* Render the children recursively */}
      {isOpen && node.children && (
        <div>
          {node.children.map((child: any, index: number) => (
            <TreeNode key={index} node={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Tree Component
function Tree({ data, onSelect }: { data: any[], onSelect: any }) {
  return (
    <div onClick={(e) => { e.stopPropagation() }} >
      {data.map((node, index) => (
        <TreeNode key={index} node={node} onSelect={onSelect} />
      ))}
    </div>
  );
};