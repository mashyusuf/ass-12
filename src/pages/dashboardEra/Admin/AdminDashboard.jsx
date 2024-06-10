import { FaUsers, FaMoneyBillWave, FaShoppingCart } from 'react-icons/fa'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async';

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch Admin Stat Data here
  const { data: statData = {}, isLoading, isError, error } = useQuery({
    queryKey: ['statData'],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get('/admin-dashboard');
        return data;
      } catch (error) {
        throw new Error('Error fetching admin dashboard data');
      }
    },
  });

  if (isLoading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Helmet>
                <title>Medicine House | Dashboard</title>
            </Helmet>
      <div className='mt-12'>
        {/* small cards */}
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 justify-between'>
          {/* Sales Card */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-blue-200 text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
            >
              <FaMoneyBillWave className='w-8 h-8 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-lg leading-normal font-bold text-gray-600'>
                Total Sales
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-3xl font-extrabold leading-snug text-gray-900'>
                ${statData.totalPrice}
              </h4>
            </div>
          </div>
          {/* Users Card */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-green-200 text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
            >
              <FaUsers className='w-8 h-8 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-lg leading-normal font-bold text-gray-600'>
                Total Users
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-3xl font-extrabold leading-snug text-gray-900'>
                {statData.totalUsers}
              </h4>
            </div>
          </div>
          {/* Total Payments */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-red-200 text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-red-600 to-red-400 text-white shadow-red-500/40`}
            >
              <FaShoppingCart className='w-8 h-8 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-lg leading-normal font-bold text-gray-600'>
                Total Payments
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-3xl font-extrabold leading-snug text-gray-900'>
                {statData.totalPayment}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStatistics;
