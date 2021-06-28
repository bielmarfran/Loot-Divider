import React from 'react'
export default function InputCustom(inputValues: {
  name: string
  placeholder: string
}): JSX.Element {
  return (
    <div className="w-full px-3 mb-6 md:mb-0">
      <label className="labelInput" htmlFor="platinium">
        {inputValues.name}
      </label>
      <input
        className="inputIndex"
        id={inputValues.name}
        type="number"
        min="1"
        step="1"
        pattern="\d+"
        placeholder={inputValues.placeholder}
      />
    </div>
  )
}
