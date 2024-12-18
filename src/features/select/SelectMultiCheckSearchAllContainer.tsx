import { useState } from "react"
import SelectMultiCheckSearchAll, { SelectMultiCheckSearchAllOption } from "@/components/custom/select/multi-select/SelectMultiCheckSearchAll"
import { addAllAtStartInOptionsArray } from "@/components/custom/select/multi-select/SelectMultiCheckSearchAllHelpers"

const options = [
  { label: 'Option1', value: 'Option1' },
  { label: 'Option2', value: 'Option2' },
  { label: 'Option3', value: 'Option3' },
  { label: 'Option4', value: 'Option4' },
  { label: 'Option5', value: 'Option5' },
  { label: 'Option6', value: 'Option6' },
  { label: 'Option7', value: 'Option7' },
  { label: 'Option8', value: 'Option8' },
  { label: 'Option9', value: 'Option9' },
  { label: 'Option10', value: 'Option10' },
]

export default function SelectMultiCheckSearchAllContainer() {
  const [values, setValues] = useState<SelectMultiCheckSearchAllOption[]>([])

  return (
    <div className="">
      <header className="grid grid-cols-[1fr_2fr_1fr] bg-gray-100 border-b-[1px] border-solid border-gray-300 shadow">
        <div className="left">
          <div className="icon first"></div>
        </div>
        <div className="flex flex-row justify-center items-center p-[0.4rem] min-h-[44px]">Select Multi Check Search All</div>
        <div className="right"></div>
      </header>
      <div className="overflow-y-hidden h-[calc(100vh-58px-44px-12px)]">
        <div className="pt-10 w-[300px] mx-auto h-full">
          <SelectMultiCheckSearchAll value={values} onChange={o => setValues(o)} options={addAllAtStartInOptionsArray(options)} closeDropdownOnSelect={false} />
        </div>
      </div>
    </div>
  )
}