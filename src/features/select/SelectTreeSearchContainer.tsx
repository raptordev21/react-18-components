import { useState } from "react"
import SelectTreeSearch, { SelectTreeSearchOption, SelectTreeSearchOptions } from "@/components/custom/select/single-select/SelectTreeSearch";

const options: SelectTreeSearchOptions = [
  {
    value: 'GP1',
    children: [
      {
        value: 'P1',
        children: [
          {
            value: 'C1',
            children: [{ value: 'C11', children: [] }]
          },
          {
            value: 'C2',
            children: []
          },
        ]
      },
      {
        value: 'P2',
        children: []
      },
    ]
  },
  {
    value: 'GP2',
    children: []
  },
  {
    value: 'GP3',
    children: [
      {
        value: 'P31',
        children: [
          {
            value: 'C31',
            children: []
          },
          {
            value: 'C32',
            children: []
          },
        ]
      },
      {
        value: 'P32',
        children: []
      },
    ]
  },
]

export default function SelectTreeSearchContainer() {
  const [value, setValue] = useState<SelectTreeSearchOption | null>(null)

  return (
    <div className="">
      <header className="grid grid-cols-[1fr_2fr_1fr] bg-gray-100 border-b-[1px] border-solid border-gray-300 shadow">
        <div className="left">
          <div className="icon first"></div>
        </div>
        <div className="flex flex-row justify-center items-center p-[0.4rem] min-h-[44px]">Select Tree Search</div>
        <div className="right"></div>
      </header>
      <div className="overflow-y-hidden h-[calc(100vh-58px-44px-12px)]">
        <div className="pt-10 w-[300px] mx-auto h-full">
          <SelectTreeSearch value={value} onChange={o => setValue(o)} options={options} />
        </div>
      </div>
    </div>
  )
}