import Head from 'next/head'
//import Link from 'next/link'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Table from '../components/Table/Table'
import Modal from '../components/Modal/Modal'
import InputCustom from '../components/Input/InputCustom'
import GetData from '../components/GetData/GetData'
import { useState, useEffect } from 'react'
import { addDefaultPlayers, getPlayer } from '../helpers/crudPlayer'
import { getLootEvents, deleteLastLoot } from '../helpers/crudEvent'
//import { returnHtmlElement } from '../helpers/generic'

export default function Home(): JSX.Element {
  const [players, setPlayers] = useState([])
  const [loot, setLoot] = useState([])
  const [lootName, setLootName] = useState('')
  useEffect(() => {
    refresh()
    theme()
  }, [])

  const refresh = async () => {
    await addDefaultPlayers()
    setPlayers(await getPlayer())
    setLoot(await getLootEvents())
    const x = await getLootEvents()
    setLootName('Loot ' + (x.length + 1))
  }
  const data = GetData()
  return (
    <div className="bg-gray-100 dark:bg-dark">
      {/* <html className="dark" /> */}
      <Head>
        <title>Loot Divider</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Loot Divider a platform to streamline the process of Loot distribution in D&D Pathfinder games."
        ></meta>
      </Head>
      <Header refresh={refresh} />
      <div className="flex flex-col bg-gray-100 dark:bg-dark-light md:h-screen">
        {/*  */}
        <div className="grid mx-2 bg-gray-100 place-items-center sm:rounded-lg dark:bg-dark-light">
          {/* <div id="alertSection" className="hidden w-7/12">
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
          </div> */}
          <div className="w-9/12 my-10 bg-white shadow-lg first-line:rounded-lg dark:bg-dark dark:text-white">
            <Modal
              type={'GearOutline'}
              color={''}
              text={data[0].configuration}
              style={'inline float-right mt-5 mr-5 h-7 w-7'}
              category={'configuration'}
              refresh={refresh}
            />

            <form className="w-11/12 py-5 pr-2 m-4 sm:pl-10" id="totalInput">
              <div className="flex flex-wrap mb-6 ">
                <div className="w-full mb-6 md:w-full md:mb-0">
                  <label className="labelInput" htmlFor="lootName">
                    {data[0].nameLoot}
                  </label>
                  <input
                    className="inputIndex"
                    id="lootName"
                    type="text"
                    key={lootName}
                    defaultValue={lootName || ''}
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
                  <Modal
                    type={'button'}
                    color={'gray'}
                    text={data[0].share}
                    style={''}
                    refresh={refresh}
                    category={'multipleInput'}
                  />
                </div>
              </div>
              <div className="flex flex-wrap justify-evenly">
                <div className="mb-5">
                  <Modal
                    type={'button'}
                    color={'green'}
                    text={data[0].addNewPlayer}
                    style={''}
                    refresh={refresh}
                    category={'addPlayer'}
                  />
                </div>
                <div className="">
                  <button
                    className="w-32 p-2 font-semibold text-white bg-red-400 rounded-md hover:bg-red-600 dark:bg-dark-red dark:hover:bg-dark-red2"
                    type="button"
                    onClick={async () => {
                      await deleteLastLoot()
                      await refresh()
                    }}
                  >
                    {data[0].removeLoot}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <Table players={players} loot={loot} refresh={refresh} />
        </div>
        <Footer />
      </div>
    </div>
  )
  // async function callPlayers() {
  //   setPlayers(await getPlayer())
  // }
  // async function callLoot() {
  //   setLoot(await getLootEvents())
  // }
  function theme() {
    if (typeof window !== 'undefined') {
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        //document.documentElement.classList.add('dark')
      } else {
        //document.documentElement.classList.remove('dark')
      }

      // Whenever the user explicitly chooses light mode

      // Whenever the user explicitly chooses dark mode
      //localStorage.theme = 'dark'
    }
  }
}
