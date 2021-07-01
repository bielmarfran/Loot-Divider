import React from 'react'
export default function InputCustom(inputValues: {
  name: string
  placeholder?: string
  value?: number
  type?: string
}): JSX.Element {
  return (
    <div className="w-full px-3 mb-6 md:mb-0">
      <label className="labelInput" htmlFor={inputValues.name}>
        {inputValues.name == 'Itens' ? 'Itens(Gold)' : inputValues.name}
      </label>
      <input
        className="inputIndex"
        id={inputValues.name}
        type={inputValues.type !== null ? inputValues.type : 'number'}
        min="1"
        step="1"
        pattern="\d+"
        placeholder={inputValues.placeholder}
        defaultValue={inputValues.value}
      />
    </div>
  )
}
