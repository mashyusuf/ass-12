import { Helmet } from 'react-helmet-async'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UserDataRow from '../../../Components/ManageUserRow/ManageUserRow';

const ManageUsers = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    //-----Tan stack query ----- fetch data----
    const { data: users = [], isLoading ,refetch} = useQuery({
        queryKey: ['users'], // Corrected query key
        queryFn: async () => {
            try {
                // Fetch data from API
                const { data } = await axiosSecure.get(`/users`);
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw new Error('Error fetching data');
            }
        }
    });
    console.log(users)
    if (isLoading) return <span className="loading loading-bars loading-lg"></span>
  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <Helmet>
          <title>Manage Users</title>
        </Helmet>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <h1 className='text-blue-600 font-bold'>Users : {users.length}</h1>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-200 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold'
                    >
                      Email
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-green-200 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold'
                    >
                      Role
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-yellow-200 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold'
                    >
                      Status
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-red-200 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {
                      users.map(user => <UserDataRow key={user._id} user={user} refetch={refetch}></UserDataRow>)
                    }
                    </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageUsers
