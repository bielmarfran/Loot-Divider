import React from 'react'

export default function Button(buttonValues: {
  completeButtonRef: any
  color: string
  openModal: () => void
  text: string
}): JSX.Element {
  const palette = {
    red: 'w-32 p-2 font-semibold text-white bg-red-400 rounded-md hover:bg-red-600',
    green:
      'w-32 p-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700',
  }
  return (
    <button
      ref={buttonValues.completeButtonRef}
      className={buttonValues.color === 'red' ? palette.red : palette.green}
      type="button"
      onClick={() => {
        buttonValues.openModal()
      }}
    >
      {buttonValues.text}
    </button>
  )
}
