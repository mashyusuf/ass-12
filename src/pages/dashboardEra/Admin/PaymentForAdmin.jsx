
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaHourglassHalf, FaCheckCircle } from 'react-icons/fa'; // Import the icons from react-icons
import { Helmet } from 'react-helmet-async';

const PaymentForAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['medicines'], 
        queryFn: async () => {
            const { data } = await axiosSecure.get('/admin-pay');
            return data;
        }
    });

    const mutation = useMutation({
        mutationFn: (paymentId) => axiosSecure.patch(`/admin-pay/${paymentId}`),
        onSuccess: () => {
            console.log("Payment status updated successfully");
            // Invalidate and refetch the payments query to get the updated data
            queryClient.invalidateQueries(['medicines']);
        },
        onError: (error) => {
            console.error("Error updating payment status:", error);
        }
    });

    const handlePaymentStatusChange = (paymentId) => {
        console.log("Button clicked, paymentId:", paymentId);
        mutation.mutate(paymentId);
    };
    if(isLoading) return <span className="loading loading-bars loading-lg"></span>

    return (
        <div className="p-6">
            <Helmet>
                <title>Medicine House | Payment</title>
            </Helmet>
            <h1 className="text-3xl font-bold text-blue-700 mb-4">Payments: {payments.length}</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full min-w-max">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Users Email</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id} className="bg-white border-b">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2 text-xl font-semibold text-gray-700">{payment.email}</td>
                                <td className="px-4 py-2 text-xl font-semibold text-gray-700">{payment.price}</td>
                                <td className="px-4 py-2">
                                    {payment.status === 'pending' ? (
                                        <button
                                            className="flex items-center bg-yellow-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-500"
                                            onClick={() => handlePaymentStatusChange(payment._id)}
                                        >
                                            <FaHourglassHalf className="mr-2" />
                                            Pending
                                        </button>
                                    ) : (
                                        <button
                                            className="flex items-center bg-green-500 text-white font-bold py-2 px-4 rounded-lg"
                                            disabled
                                        >
                                            <FaCheckCircle className="mr-2" />
                                            Paid
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentForAdmin;
