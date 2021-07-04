import React, { useState } from 'react'
import { exportData } from '../../helpers/exportData'
import { importData } from '../../helpers/importData'
import { deleteDataBase } from '../../helpers/crud'
import GetData from '../GetData/GetData'
//import InputCustom from '../Input/InputCustom'

//  interface Props {
//     title:string
//  }

export default function ConfigModal(props: {
  closeModal: () => void
  input?: string
  refresh?: any
  type?: boolean
  oldName?: string
}): JSX.Element {
  const [importFile, setImportFile] = useState()
  const data = GetData()
  return (
    <div className="">
      <div className="flex justify-between px-5 py-4 border-b border-gray-100 dark:border-dark-border">
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
        <div>
          {data[0].deleteDatabase + ':'}
          <button
            type="button"
            className="px-4 py-2 ml-3 mr-3 font-bold text-white bg-red-500 rounded hover:bg-red-700 "
            onClick={async () => {
              if (await deleteDataBase()) {
                await props.closeModal()
                await props.refresh()
              }
            }}
          >
            {data[0].deleteDatabase}
          </button>
        </div>
        <div>
          {data[0].exportDatabase + ':'}
          <button
            type="button"
            onClick={() => {
              exportData()
            }}
            className="px-4 py-2 mt-2 ml-3 mr-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            {data[0].exportDatabase}
          </button>
        </div>
        <hr className="my-5 dark:bg-dark-border" />
        <div className="">
          {/* disabled="true" */}
          {data[0].importDatabase + ':'}
          <input
            type="file"
            id="file-selector"
            accept=".txt"
            onChange={(e) => {
              const file = e.target.files[0]
              const reader = new FileReader()

              reader.addEventListener('load', (event) => {
                try {
                  const result = event.target.result as string
                  setImportFile(JSON.parse(result))
                } catch (error) {
                  window.alert(data[0].errorReadingFile)
                  const fileSelect = document.getElementById(
                    'file-selector'
                  ) as HTMLInputElement
                  fileSelect.value = ''
                }
              })
              reader.readAsText(file)
            }}
          />
          <button
            type="button"
            id="importBank"
            onClick={async () => {
              if (await importData(importFile)) {
                // eslint-disable-next-line no-console
                await props.refresh()
                await props.closeModal()
              }
            }}
            className="px-4 py-2 mt-2 ml-3 mr-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            {data[0].importDatabase}
          </button>
        </div>
      </div>
      <div className="flex justify-end px-5 py-4">
        <button
          type="button"
          className="px-4 py-2 mr-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
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
