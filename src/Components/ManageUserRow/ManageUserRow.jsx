import PropTypes from 'prop-types'
import { useState } from 'react'
import UpdateUserModal from '../Modal/UpdateUserModal'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
const UserDataRow = ({ user , refetch }) => {
    const {user:loggedIn}=useAuth()
    const [isOpen,setIsOpen] = useState(false)

    const axiosSecure = useAxiosSecure()
    const { mutateAsync } = useMutation({
      mutationFn: async role => {
        const { data } = await axiosSecure.patch(
          `/user/update/${user?.email}`,
          role
        )
        return data
      },
      onSuccess: data => {
        refetch()
        console.log(data)
        toast.success('User role updated successfully!')
        setIsOpen(false)
      },
     
    })
    const modalHandler = async selected =>{
        if(loggedIn.email === user.email){
            toast.error('Action Not Alow You Are the Admin')
            return setIsOpen(false)
        } 
            
        console.log('Yooooooooooo',selected)
        const userRole = {
            role: selected,
            status: 'Verified',
        }
        try{
       await mutateAsync(userRole)
       
    } catch(err){
    console.log(err)
    toast.error('User role is not updated !')
    }
    }
  return (
    <tr>  
      <td className='px-5 py-5 border-b border-gray-200 bg-blue-100 text-sm'>
        <p className='text-gray-900 whitespace-no-wrap font-bold'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-green-100 text-sm'>
        <p className='text-gray-900 whitespace-no-wrap font-bold'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-yellow-100 text-sm'>
        {user?.status ? (
          <p
            className={`${
              user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
            } whitespace-no-wrap font-bold`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap font-bold'>Unavailable</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-red-100 text-sm'>
        <button onClick={()=> setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative font-bold'>Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal isOpen={isOpen} setIsOpen={setIsOpen} modalHandler={modalHandler} user={user}></UpdateUserModal>
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow
