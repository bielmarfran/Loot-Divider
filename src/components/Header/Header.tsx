import React from 'react'
// import Modal from '../Modal/Modal'
import { GiBattleGear as Logo2 } from 'react-icons/gi'
// GiSwordsEmblem as Logo,

import { VscColorMode as DarkMode } from 'react-icons/vsc'

export default function Header(): JSX.Element {
  return (
    <div className="dark:bg-brand dark:text-white">
      <nav className="flex flex-col content-center w-full px-6 py-2 text-center sm:flex-row sm:text-left sm:justify-between 3xl:py-10 sm:items-baseline md:w-11/12">
        <div className="flex">
          <a className="_o6689fn" href="/">
            <div className="md:block">
              <Logo2
                className="self-center inline-block w-12 h-12 mr-auto"
                aria-hidden="true"
                title="JavaScript"
              />
              <h1 className="inline ml-2 text-3xl py-auto">Loot Divider</h1>
            </div>
          </a>
        </div>
        <div className="self-center my-auto ml-auto sm:mb-0 3xl:place-self-auto">
          <a
            href="#"
            className="px-1 pr-10 ml-2 text-2xl font-semibold no-underline 3xl:text-6xl 3xl:pr-20 hover:text-red-600"
          >
            Wiki
          </a>
          <a
            href="#"
            className="px-1 pr-10 ml-2 text-2xl font-semibold no-underline 3xl:text-6xl 3xl:pr-20 hover:text-red-600"
          >
            Test
          </a>
          <DarkMode
            className="self-center inline-block w-8 h-8 mr-auto"
            aria-hidden="true"
            title="JavaScript"
          />
        </div>
      </nav>
    </div>
  )
}
