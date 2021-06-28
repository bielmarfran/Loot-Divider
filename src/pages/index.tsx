import Head from 'next/head'
//import Link from 'next/link'
import Header from '../components/Header/Header'
import Table from '../components/Table/Table'
import Modal from '../components/Modal/Modal'
//import Button from '../components/Button/Button'
import InputCustom from '../components/Input/Input'
import en from '../data/en'
import { useState } from 'react'

export default function Home(): JSX.Element {
  const [data] = useState(en) //, setData
  return (
    <div className="">
      <html className="dark" />
      <Head>
        <title>Loot Divider</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex flex-col h-screen bg-gray-100 ">
        {/* dark:bg-brand-light */}
        <div className="grid mx-2 place-items-center sm:rounded-lg">
          <div id="alertSection" className="hidden w-7/12">
            <div className="items-center w-3/4 px-6 py-4 mx-auto my-4 text-lg bg-blue-200 rounded-md xl:w-2/4">
              <svg
                viewBox="0 0 24 24"
                className="hidden w-5 h-5 mr-3 text-blue-600 sm:w-5 sm:h-5 sm:block "
              >
                <path
                  fill="currentColor"
                  d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"
                ></path>
              </svg>
              <span className="text-blue-800"> {data[0].databaseDeleted} </span>
              <div className="inline float-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-9/12 my-10 bg-white shadow-lg first-line:rounded-lg">
            <Modal
              type={'GearOutline'}
              color={''}
              text={data[0].configuration}
              style={'inline float-right mt-5 mr-5 h-7 w-7'}
            />

            <form className="w-11/12 py-5 pr-2 m-4 sm:pl-10">
              <div className="flex flex-wrap mb-6 ">
                <div className="w-full mb-6 md:w-full md:mb-0">
                  <label className="labelInput" htmlFor="grid-first-name">
                    {data[0].nameLoot}
                  </label>
                  <input
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Jane"
                    value="Loot"
                  />
                </div>
              </div>
              <div className="grid mb-2 -mx-3 gap-y-2 md:grid-cols-3">
                {data[0].currency.map((coin, index) => (
                  <InputCustom
                    name={coin[0]}
                    placeholder={coin[1]}
                    key={index}
                  />
                ))}
              </div>

              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3 mb-6 md:w-full md:mb-0">
                  <button
                    id="Login"
                    type="button"
                    className="w-full py-3 mt-10 font-medium text-white uppercase bg-gray-800 rounded-lg focus:outline-none hover:bg-gray-700 hover:shadow-none"
                  >
                    {data[0].share}
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap justify-evenly">
                <div className="mb-5">
                  <Modal
                    type={'button'}
                    color={'green'}
                    text={data[0].newPlayer}
                    style={''}
                  />
                </div>
                <div className="">
                  <Modal
                    type={'button'}
                    color={'red'}
                    text={data[0].removeLoot}
                    style={''}
                  />
                </div>
              </div>
            </form>
          </div>
          <Table />
        </div>
      </div>
    </div>
  )
}
