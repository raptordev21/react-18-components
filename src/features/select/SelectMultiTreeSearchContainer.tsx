// import { useState } from "react";

export default function SelectMultiTreeSearchContainer() {

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
        Select
      </div>
    </div>
  )
}