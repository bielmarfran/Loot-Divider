import React from 'react'

export default function Button(buttonValues: {
  completeButtonRef?: any
  color: string
  openModal?: () => void
  text: string
}): JSX.Element {
  const palette = {
    green:
      'w-32 p-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700',
    gray: 'w-full py-3 mt-10 font-medium text-white uppercase bg-gray-800 rounded-lg focus:outline-none hover:bg-gray-700 hover:shadow-none',
  }
  return (
    <button
      ref={buttonValues.completeButtonRef}
      className={getColor(buttonValues.color)}
      type="button"
      onClick={() => {
        buttonValues.openModal()
      }}
    >
      {buttonValues.text}
    </button>
  )

  function getColor(color) {
    switch (color) {
      case 'green':
        return palette.green
        break
      case 'gray':
        return palette.gray
        break

      default:
        break
    }
  }
}
