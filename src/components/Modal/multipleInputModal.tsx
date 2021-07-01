import React, { useEffect } from 'react'
import InputCustom from '../Input/InputCustom'
//
// import { addLootEvent } from '../../helpers/crudOperations'
import { getTotal, getInicialPayment } from '../../helpers/prepEvents'
import { cleanEvent } from '../../helpers/teste'
import { clearInputAll } from '../../helpers/formatData'

export default function MultipleInputModal(props: {
  closeModal: () => void
  input: any
  refresh: any
}): JSX.Element {
  const total = getTotal()
  useEffect(() => {
    if (total < props.input.length / 100 || total === 0) {
      // create = false;
      window.alert('Insira o minimo')
      props.closeModal()
    }
    // eslint-disable-next-line no-console
    console.log(getInicialPayment())
  }, [])

  return (
    <div className="">
      <div className="flex justify-between px-5 py-4 mb-4 border-b border-gray-100"></div>
      <span className="mb-5 text-2xl">{'Total : ' + total}</span>
      <div className="w-full mt-4 md:mb-0">
        <div className="grid mb-2 -mx-3 gap-y-2 md:grid-cols-2">
          {props.input.map((player, index) => (
            <InputCustom name={player.name} key={index} placeholder={'0'} />
          ))}
        </div>
      </div>
      {/* onClick={closeModal} */}
      <div className="flex justify-end px-5 py-4">
        <button
          type="button"
          className="px-4 py-2 mr-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={async () => {
            await cleanEvent('2')
            props.closeModal()
            clearInputAll()
            props.refresh()
          }}
        >
          Ok
        </button>
        <button
          type="button"
          onClick={() => {
            props.closeModal()
          }}
          className="px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-gray-500 hover:text-white hover:border-transparent"
        >
          Close
        </button>
      </div>
    </div>
  )
}
{
  /* <div className="flex justify-end px-5 py-4">
              <button type="button" onclick="addPlayer2('mymodalcentered2')" className="px-4 py-2 mr-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                Ok
              </button>
              <button type="button"  onclick="modalClose('mymodalcentered2')" className="px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-gray-500 hover:text-white hover:border-transparent">
                  Close
              </button>
            </div> */
}
