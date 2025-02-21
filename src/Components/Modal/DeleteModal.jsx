import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

const DeleteModal = ({ closeModal, isOpen, handleDelete, id }) => {
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
              <DialogPanel className='w-full max-w-lg transform overflow-hidden rounded-3xl bg-gradient-to-r from-red-400 to-pink-500 p-8 text-left align-middle shadow-2xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-3xl font-extrabold text-center leading-6 text-white'
                >
                  Are you sure?
                </DialogTitle>
                <div className='mt-4'>
                  <p className='text-lg text-center font-semibold text-white'>
                    You cannot undo this action once it's done!
                  </p>
                </div>
                <hr className='mt-6 border-gray-300' />
                <div className='flex mt-6 justify-around'>
                  <button 
                    onClick={() => handleDelete(id)}
                    type='button'
                    className='inline-flex justify-center rounded-lg border border-transparent bg-red-600 px-8 py-3 text-lg font-semibold text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transform hover:scale-105 transition-transform'
                  >
                    Yes
                  </button>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-lg border border-transparent bg-green-600 px-8 py-3 text-lg font-semibold text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transform hover:scale-105 transition-transform'
                    onClick={closeModal}
                  >
                    No
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

DeleteModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default DeleteModal;
