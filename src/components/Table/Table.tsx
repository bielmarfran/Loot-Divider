import React, { useState } from 'react'
import en from '../../data/en'
import Modal from '../Modal/Modal'
import { HiMinus as Minus } from 'react-icons/hi'
import { formatReturn } from '../../helpers/formatData'
//, HiPlus as Plus
export default function Table(props: {
  players: any
  loot: any
  refresh: any
}): JSX.Element {
  const [data] = useState(en)
  const headers = data[0].headers
  // eslint-disable-next-line no-console
  //console.log('TABLE')
  return (
    <div className="container">
      <table className="flex flex-row flex-no-wrap w-full my-5 overflow-hidden bg-white rounded-lg sm:shadow-lg">
        <thead className="text-white" id="tHead">
          {props.loot.lenght > 0 ? (
            props.loot.map((loot, index2) => (
              <tr className="flex-no wrap headerTableSize" key={index2}>
                {headers.map((column, index) => (
                  <th className="headerStyle" key={index}>
                    {index == 0 && index2 == 0 ? (
                      <Minus
                        className="inline float-left w-6 h-6 ml-2"
                        aria-hidden="true"
                        title="Minus"
                      />
                    ) : (
                      ''
                    )}
                    {column}
                  </th>
                ))}
                {props.players.map((player, index) => (
                  <th className="headerStyle" key={index}>
                    {index2 == 0 ? (
                      <Modal
                        type={'GearOutline'}
                        color={''}
                        text={data[0].changeName}
                        style={'h-6 w-6  inline	float-right ml-2 mt-0.5'}
                        category="changeName"
                        refresh={props.refresh}
                        oldName={player.name}
                      />
                    ) : (
                      ''
                    )}

                    {player.name}
                  </th>
                ))}
              </tr>
            ))
          ) : (
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
                </th>
              ))}
              {props.players.map((player, index) => (
                <th className="headerStyle" key={index}>
                  <Modal
                    type={'GearOutline'}
                    color={''}
                    text={data[0].changeName}
                    style={'h-6 w-6  inline	float-right ml-2 mt-0.5'}
                    category="changeName"
                    refresh={props.refresh}
                    oldName={player.name}
                  />
                  {player.name}
                </th>
              ))}
            </tr>
          )}
        </thead>
        <tbody className="flex-1 sm:flex-none" id="rowTbody">
          {props.loot !== undefined
            ? props.loot.map((loot, index) => (
                <tr className="rowTableTr flex-no wrap" key={index}>
                  <th className=" rowTableTd">{props.loot[index].loot.name}</th>
                  <th className=" rowTableTd">
                    {formatReturn(props.loot[index].loot.value)}
                  </th>
                  {props.loot[index].finalPayments.map((pay, index2) => (
                    <th
                      className={
                        props.loot[index].players[index2].active == true
                          ? 'rowTableTd'
                          : 'rowTableTdNotActive'
                      }
                      key={index + 2 + index2}
                    >
                      {props.loot[index].players[index2].active == true
                        ? formatReturn(pay.value)
                        : '-'}
                    </th>
                  ))}
                </tr>
              ))
            : ''}
        </tbody>
      </table>
    </div>
  )
}
//props.loot[index2].players === true ? 'rowTableTd' :  'rowTableTdNotActive'
