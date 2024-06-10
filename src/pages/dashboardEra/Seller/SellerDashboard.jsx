import { FaDollarSign } from 'react-icons/fa'
import { BsFillCartPlusFill, BsFillHouseDoorFill } from 'react-icons/bs'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
const  SellerDashboard = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch Seller Dashboard Data
    const { data: dashboardData = {}, isLoading, isError, error } = useQuery({
      queryKey: ['dashboardData'],
      queryFn: async () => {
        try {
          const { data } = await axiosSecure.get('/seller-dashboard');
          return data;
        } catch (error) {
          throw new Error('Error fetching seller dashboard data');
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
    <div className="bg-gray-100 py-8 px-4">
      <Helmet>
                <title>Medicine House | Dashboard</title>
            </Helmet>
      <div className='mt-12'>
        {/* small cards */}
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {/* Total Sales */}
          <div className='relative flex flex-col bg-yellow-400 text-gray-700 shadow-md rounded-lg'>
            <div className="bg-gradient-to-tr from-yellow-600 to-yellow-400 text-white p-4 rounded-t-lg">
              <FaDollarSign className='w-6 h-6' />
            </div>
            <div className='p-4 text-center'>
              <p className='text-sm font-semibold text-gray-900'>Total Sales</p>
              <h4 className='text-2xl font-bold text-gray-900'>
                ${dashboardData.totalPaid + dashboardData.totalPending}
              </h4>
            </div>
          </div>

          {/* Total Paid */}
          <div className='relative flex flex-col bg-green-400 text-gray-700 shadow-md rounded-lg'>
            <div className="bg-gradient-to-tr from-green-600 to-green-400 text-white p-4 rounded-t-lg">
              <BsFillCartPlusFill className='w-6 h-6' />
            </div>
            <div className='p-4 text-center'>
              <p className='text-sm font-semibold text-gray-900'>Paid</p>
              <h4 className='text-2xl font-bold text-gray-900'>
                ${dashboardData.totalPaid}
              </h4>
            </div>
          </div>

          {/* Total Pending */}
          <div className='relative flex flex-col bg-blue-400 text-gray-700 shadow-md rounded-lg'>
            <div className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white p-4 rounded-t-lg">
              <BsFillHouseDoorFill className='w-6 h-6' />
            </div>
            <div className='p-4 text-center'>
              <p className='text-sm font-semibold text-gray-900'>Pending</p>
              <h4 className='text-2xl font-bold text-gray-900'>
                ${dashboardData.totalPending}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerDashboard;
