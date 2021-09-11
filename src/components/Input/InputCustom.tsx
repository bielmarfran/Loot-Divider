import React, { useEffect, useState } from 'react'
import { getTotal } from '../../helpers/prepEvents'
export default function InputCustom(inputValues: {
  name: string
  placeholder?: string
  value?: number
  type?: string
  change?: boolean
}): JSX.Element {
  const [control, setControl] = useState(inputValues.name)
  const [total, setTotal] = useState(0)
  // total = 0
  useEffect(() => {
    setTotal(getTotal())
  }, [])
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
        //pattern="\d+"
        placeholder={inputValues.placeholder}
        defaultValue={inputValues.value}
        key={control}
        onChange={
          inputValues.change == true
            ? (e) => {
                // eslint-disable-next-line no-console
                if (parseFloat(e.target.value) > total) {
                  const input = document.getElementById(
                    inputValues.name
                  ) as HTMLInputElement
                  input.value = '0' || ''
                  input.className = 'inputIndexRed'
                  // eslint-disable-next-line no-console
                  console.log('Over Max', total)
                  setControl(inputValues.name)
                }
              }
            : () => {
                // eslint-disable-next-line no-console
                console.log('change')
              }
        }
      />
    </div>
  )
}
