import React from 'react'

export default function Alert(props: { message: string }): JSX.Element {
  return (
    <div
      className={`inline bg-red-200 px-6 py-4 mx-4 my-4 rounded-md text-lg items-center w-full`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`text-red-600 hidden w-5 h-5 sm:w-5 sm:h-5 mr-3 inline sm:block sm:inline`}
      >
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"
        ></path>
      </svg>
      <span className={`text-red-800`} title="Message">
        {' '}
        {props.message}{' '}
      </span>
      <div className="inline float-right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          //onClick="closeAlert()"
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
  )
}
