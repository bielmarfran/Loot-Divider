import React from 'react'
import InputCustom from '../Input/InputCustom'
import { editPlayer } from '../../helpers/editPlayer'
//  interface Props {
//     title:string
//  }

export default function InputModal(props: {
  closeModal: () => void
  input: string
  refresh?: any
  type?: boolean
  oldName?: string
}): JSX.Element {
  return (
    <div className="">
      <div className="flex justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <i className="text-orange-500 fa fa-exclamation-triangle"></i>
        </div>
        <div>
          <button>
            <i className="text-red-500 transition duration-150 fa fa-times-circle hover:text-red-600"></i>
          </button>
        </div>
      </div>
      <div className="w-full p-3 md:mb-0">
        <InputCustom name={props.input} placeholder={''} type="text" />
      </div>
      {/* onClick={closeModal} */}
      <div className="flex justify-end px-5 py-4">
        <button
          type="button"
          className="px-4 py-2 mr-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={async () => {
            if (await editPlayer(props.type, props.oldName)) {
              await props.refresh()
              await props.closeModal()
            }
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
