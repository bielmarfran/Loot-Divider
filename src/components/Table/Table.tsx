import React, { useState } from 'react'
import en from '../../data/en'
import Modal from '../Modal/Modal'
import { HiMinus as Minus } from 'react-icons/hi'
//, HiPlus as Plus
export default function Table(): JSX.Element {
  const [data] = useState(en)
  const headers = data[0].headers
  return (
    <div className="container">
      <table className="flex flex-row flex-no-wrap w-full my-5 overflow-hidden bg-white rounded-lg sm:shadow-lg">
        <thead className="text-white" id="tHead">
          <tr className="flex-no wrap headerTableSize">
            {headers.map((column, index) => (
              <th className="headerStyle" key={index}>
                {index == 0 ? (
                  <Minus
                    className="inline float-left w-6 h-6 ml-2"
                    aria-hidden="true"
                    title="Minus"
                  />
                ) : (
                  ''
                )}
                {column}
                {index >= 2 ? (
                  <Modal
                    type={'GearOutline'}
                    color={''}
                    text={data[0].changeName}
                    style={'h-5 w-5  inline 	float-right ml-2 mt-0.5'}
                  />
                ) : (
                  ''
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="flex-1 sm:flex-none" id="rowTbody"></tbody>
      </table>
    </div>
  )
}
