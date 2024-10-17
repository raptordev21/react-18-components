import { useState } from 'react'
import { PiCaretDownLight, PiCaretUpLight } from "react-icons/pi"

// Recursive TreeNode Component
function TreeNode({ node, onSelect }: { node: any, onSelect: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
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
        <div onClick={() => { onSelect(node) }} className='cursor-pointer text-gray-600 hover:text-gray-900'>{node.value}</div>
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
export default function Tree({ data, onSelect }: { data: any[], onSelect: any }) {
  return (
    <div>
      {data.map((node, index) => (
        <TreeNode key={index} node={node} onSelect={onSelect} />
      ))}
    </div>
  );
};