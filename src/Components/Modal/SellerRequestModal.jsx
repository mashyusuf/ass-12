import PropTypes from 'prop-types'
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from '@headlessui/react'
import { Fragment } from 'react'

const HostModal = ({ closeModal, isOpen,modalHandle }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-50' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-lg transform overflow-hidden rounded-3xl bg-gradient-to-r from-blue-400 to-purple-500 p-8 text-left align-middle shadow-2xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-2xl font-extrabold text-center leading-6 text-white'
                >
                  Become A Seller!
                </DialogTitle>
                <div className='mt-4'>
                  <p className='text-md text-center font-semibold text-gray-200'>
                    Please read all the terms & conditions before becoming a
                    host.
                  </p>
                </div>
                <hr className='mt-6 border-gray-300' />
                <div className='flex mt-4 justify-around'>
                  <button
                  onClick={modalHandle}
                    type='button'
                    className='inline-flex justify-center rounded-lg border border-transparent bg-green-200 px-6 py-3 text-md font-semibold text-green-900 hover:bg-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transform hover:scale-105 transition-transform'
                  >
                    Continue
                  </button>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-lg border border-transparent bg-red-200 px-6 py-3 text-md font-semibold text-red-900 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transform hover:scale-105 transition-transform'
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

HostModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  modalHandle: PropTypes.func
}

export default HostModal
