import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

const SellerPayment = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [paymentHistory, setPaymentHistory] = useState([]);

    const fetchPaymentHistory = async () => {
        const res = await axiosSecure.get(`/payment-seller?email=${user.email}`);
        return res.data;
    };

    const { data: sellerPayment = [] } = useQuery({
        queryKey: 'sellerPayment',
        queryFn: fetchPaymentHistory,
    });

    const handleStatusChange = async (paymentId, newStatus) => {
        // Here you can implement the logic to update the payment status
        // For example, you can send a request to your backend API to update the status
        // after admin changes it
    };

    return (
        <div className="bg-gray-200 p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Seller Payment</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse bg-white shadow-md">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="border px-6 py-4">Payment ID</th>
                            <th className="border px-6 py-4">Price</th>
                            <th className="border px-6 py-4">Transaction ID</th>
                            <th className="border px-6 py-4">Date</th>
                            <th className="border px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellerPayment.map(payment => (
                            <tr key={payment._id} className="odd:bg-gray-100">
                                <td className="border px-6 py-4">{payment._id}</td>
                                <td className="border px-6 py-4">{payment.price}</td>
                                <td className="border px-6 py-4">{payment.transactionId}</td>
                                <td className="border px-6 py-4">{new Date(payment.date).toLocaleString()}</td>
                                <td className="border px-6 py-4">
                                    <span className={`px-4 py-2 rounded ${payment.status === 'paid' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                                        {payment.status === 'paid' ? 'Paid' : 'Pending'}
                                    </span>
                                    {/* You can add logic here to show the status change by admin */}
                                    {payment.adminStatusChange && (
                                        <span className="block mt-2 text-sm font-normal text-gray-500">
                                            Admin Status Change: {payment.adminStatusChange}
                                        </span>
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

export default SellerPayment;
