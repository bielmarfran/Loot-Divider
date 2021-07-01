import React, { useState } from 'react'
import { exportData } from '../../helpers/exportData'
import { importData } from '../../helpers/importData'
import { deleteDataBase } from '../../helpers/crud'

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
        <div>
          Limpar o bando de dados :
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
            Limpar Banco
          </button>
        </div>
        <div>
          Exportar o banco de Dados :
          <button
            type="button"
            onClick={() => {
              exportData()
            }}
            className="px-4 py-2 mt-2 ml-3 mr-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Exportar Banco
          </button>
        </div>
        <hr className="my-5" />
        <div className="">
          {/* disabled="true" */}
          Importar o banco de Dados :
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
                  //localStorage.setItem('import', x);
                  //document.getElementById("importBank").disabled = false;
                } catch (error) {
                  window.alert('Erro ao ler o arquivo.')
                  //document.getElementById('file-selector').value = [];
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
            Importar Banco
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
