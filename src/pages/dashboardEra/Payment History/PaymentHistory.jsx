import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useReactToPrint } from "react-to-print";
import logo from '../../../assets/logo.jpg';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user.email}`);
            return res.data;
        }
    });

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `invoice_${user.email}`,
    });

    return (
        <div className="font-sans p-6">
            <div ref={componentRef} className="p-6 border border-gray-300 rounded-lg shadow-lg">
                <div className="text-center">
                    <img src={logo} alt="Logo" className="w-24 mb-4 mx-auto" />
                    <h2 className="text-3xl font-bold text-sky-600">Yusufs Medicine House</h2>
                </div>
                <div className="mb-6">
                    <strong className="block mb-2 text-xl">User Information:</strong>
                    <p className="text-lg">Name: {user?.displayName}</p>
                    <p className="text-lg">Email: {user?.email}</p>
                </div>
                <div>
                    <strong className="block mb-2 text-xl">Purchase Information:</strong>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse">
                            <thead className="bg-green-600 text-white">
                                <tr>
                                    <th className="px-4 py-2 text-xl font-bold border">#</th>
                                    <th className="px-4 py-2 text-xl font-bold border">Price</th>
                                    <th className="px-4 py-2 text-xl font-bold border">Email</th>
                                    <th className="px-4 py-2 text-xl font-bold border">TransactionId</th>
                                    <th className="px-4 py-2 text-xl font-bold border">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment, index) => (
                                    <tr key={payment._id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
                                        <td className="px-4 py-2 text-xl font-bold border">{index + 1}</td>
                                        <td className="px-4 py-2 text-xl font-bold border">{payment.price}</td>
                                        <td className="px-4 py-2 text-xl font-bold border">{payment.email}</td>
                                        <td className="px-4 py-2 text-xl font-bold border">{payment.transactionId}</td>
                                        <td className={`px-4 py-2 text-xl font-bold border ${payment.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>{payment.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <button onClick={handlePrint} className="px-6 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700">Print Invoice</button>
            </div>
        </div>
    );
};

export default PaymentHistory;
