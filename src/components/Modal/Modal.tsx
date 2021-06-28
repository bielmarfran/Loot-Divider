import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import Button from '../Button/Button'

import { HiCog as GearFill, HiOutlineCog as GearOutline } from 'react-icons/hi'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface values {
  type: string
  color: string
  text: string
  style: string
}

export default function Modal(values: {
  type: string
  color: string
  text: string
  style: string
}): JSX.Element {
  const [isShow, setIsShown] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const completeButtonRef = useRef(null)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function getSvg(name, style) {
    if (name === 'GearOutline') {
      return (
        <div
          className="inline"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          {isShow ? (
            <GearFill
              className={style}
              aria-hidden="true"
              title={values.text}
              onClick={() => {
                openModal()
              }}
            />
          ) : (
            <GearOutline
              className={values.style}
              aria-hidden="true"
              title={values.text}
              onClick={() => {
                openModal()
              }}
            />
          )}
        </div>
      )
    }
  }
  return (
    <>
      {values.type === 'button' ? (
        <Button
          color={values.color}
          text={values.text}
          openModal={openModal}
          completeButtonRef={completeButtonRef}
        />
      ) : (
        getSvg(values.type, values.style)
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          initialFocus={completeButtonRef}
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Payment successful
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent
                    your an email with all of the details of your order.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
