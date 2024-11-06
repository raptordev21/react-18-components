import { useState } from "react"
import SelectMultiTreeSearch from "@/components/custom/select/multi-select/SelectMultiTreeSearch"
import { SelectMultiTreeSearchOptions } from "@/components/custom/select/multi-select/SelectMultiTreeSearchTypes"

const options: SelectMultiTreeSearchOptions = [
  {
    id: '0',
    value: 'GP1',
    selection: 'CHILD-SELECTED',
    children: [
      {
        id: '0-0',
        value: 'P1',
        selection: 'CHILD-SELECTED',
        children: [
          {
            id: '0-0-0',
            value: 'C1',
            selection: 'SELECTED',
            children: []
          },
          {
            id: '0-0-1',
            value: 'C2',
            selection: 'NOT-SELECTED',
            children: []
          },
        ]
      },
      {
        id: '0-1',
        value: 'P2',
        selection: 'NOT-SELECTED',
        children: []
      },
    ]
  },
  {
    id: '1',
    value: 'GP2',
    selection: 'NOT-SELECTED',
    children: []
  },
  {
    id: '2',
    value: 'GP3',
    selection: 'SELECTED',
    children: [
      {
        id: '2-0',
        value: 'P31',
        selection: 'SELECTED',
        children: [
          {
            id: '2-0-0',
            value: 'C31',
            selection: 'SELECTED',
            children: []
          },
          {
            id: '2-0-1',
            value: 'C32',
            selection: 'SELECTED',
            children: []
          },
        ]
      },
      {
        id: '2-1',
        value: 'P32',
        selection: 'SELECTED',
        children: []
      },
    ]
  },
]

export default function SelectMultiTreeSearchContainer() {
  const [tree, setTree] = useState<SelectMultiTreeSearchOptions>(options)

  return (
    <div className="">
      <header className="grid grid-cols-[1fr_2fr_1fr] bg-gray-100 border-b-[1px] border-solid border-gray-300 shadow">
        <div className="left">
          <div className="icon first"></div>
        </div>
        <div className="flex flex-row justify-center items-center p-[0.4rem] min-h-[44px]">Select Multi Tree Search</div>
        <div className="right"></div>
      </header>
      <div className="overflow-y-hidden h-[calc(100vh-58px-44px-12px)]">
        <div className="pt-10 w-[300px] mx-auto h-full">
          <SelectMultiTreeSearch tree={tree} onChange={o => setTree(o)} options={tree} />
        </div>
      </div>
    </div>
  )
}