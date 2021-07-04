import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState, useEffect } from 'react'
import Button from '../Button/Button'
import InputModal from './InputModal'
import ConfigModal from './ConfigModal'
import GetData from '../GetData/GetData'
import MultipleInputModal from './multipleInputModal'

import { getPlayer } from '../../helpers/crudPlayer'

import { HiCog as GearFill, HiOutlineCog as GearOutline } from 'react-icons/hi'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface values {
  type: string
  color: string
  text: string
  style: string | any
  category: string
  refresh?: any
  oldName?: string
}

export default function Modal(values: values): JSX.Element {
  const [isShow, setIsShown] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const completeButtonRef = useRef(null)
  const data = GetData()
  const [players, setPlayers] = useState([])

  useEffect(() => {
    callPlayers()
    // eslint-disable-next-line no-console
  }, [])

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
          className="fixed inset-0 z-10 overflow-y-auto transition-opacity bg-gray-900 bg-opacity-50 "
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
              {content()}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
  function content() {
    switch (values.category) {
      case 'addPlayer':
        return (
          <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl md:w-1/3 dark:bg-dark-modal">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900 dark:text-dark-text"
            >
              {values.text}
            </Dialog.Title>
            <InputModal
              closeModal={closeModal}
              input={data[0].playerName}
              refresh={values.refresh}
              type={false}
            />
          </div>
        )
        break
      case 'changeName':
        return (
          <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl md:w-1/3 dark:bg-dark-modal">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900 dark:text-dark-text"
            >
              {values.text}
            </Dialog.Title>
            <InputModal
              closeModal={closeModal}
              input={data[0].playerName}
              refresh={values.refresh}
              type={true}
              oldName={values.oldName}
            />
          </div>
        )
        break
      case 'multipleInput':
        return (
          <div className="inline-block p-6 mt-32 mb-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl md:w-2/3 md:mt-8 dark:bg-dark-modal">
            <Dialog.Title
              as="h3"
              className="text-2xl font-medium leading-6 text-gray-900 dark:text-dark-text"
            >
              {values.text}
            </Dialog.Title>
            <MultipleInputModal
              closeModal={closeModal}
              input={players}
              refresh={values.refresh}
            />
          </div>
        )
        break
      case 'configuration':
        return (
          <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl md:w-1/3 dark:bg-dark-modal dark:border-dark-border">
            <Dialog.Title
              as="h3"
              className="text-2xl font-medium leading-6 text-gray-900 dark:text-dark-text"
            >
              {values.text}
            </Dialog.Title>
            <ConfigModal
              closeModal={closeModal}
              input={data[0].playerName}
              refresh={values.refresh}
            />
          </div>
        )
        break
      default:
        break
    }
  }
  async function callPlayers() {
    setPlayers(await getPlayer())
  }
}
