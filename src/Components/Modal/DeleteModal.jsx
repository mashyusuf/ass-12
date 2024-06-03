import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

const DeleteModal = ({ closeModal, isOpen,handleDelete, id }) => {
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
          <div className='fixed inset-0 bg-black bg-opacity-25' />
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
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-2xl font-bold leading-6 text-purple-700'
                >
                  Are you sure?
                </DialogTitle>
                <div className='mt-2'>
                  <p className='text-base text-gray-700 font-medium'>
                    You cannot undo once its done!
                  </p>
                </div>
                <hr className='mt-8 ' />
                <div className='flex mt-4 justify-around'>
                  <button onClick={()=> handleDelete(id)}
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-500 px-6 py-3 text-base font-bold text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                  >
                    Yes
                  </button>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-green-500 px-6 py-3 text-base font-bold text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
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
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default DeleteModal;
