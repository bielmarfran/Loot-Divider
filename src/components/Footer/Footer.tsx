import React from 'react'
import GetData from '../GetData/GetData'
import { SiGithub as Github } from 'react-icons/si'

export default function Footer(): JSX.Element {
  const data = GetData()
  return (
    <nav className="flex items-center justify-center w-full h-20 px-12 py-6 mx-auto mt-auto bg-white dark:bg-dark">
      <div className="flex mx-auto text-center text-black dark:text-white">
        <p className="mt-0.5">{data[0].footer}</p>
        <a
          href={'https://github.com/bielmarfran/Loot-Divider'}
          target="blank"
          aria-label="GitHub"
          title="GitHub"
        >
          <Github
            className="self-center inline-block ml-3 w-7 h-7 2k:w-9 2k:h-9 4k:w-12 4k:h-24"
            aria-hidden="true"
            title="GitHub"
          />
        </a>
      </div>
    </nav>
  )
}
