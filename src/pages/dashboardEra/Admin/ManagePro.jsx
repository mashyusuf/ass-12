import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from 'sweetalert2';

const ManagePro = () => {
    const axiosSecure = useAxiosSecure();
    
    const { data: medicines = [], isLoading, refetch } = useQuery({
        queryKey: ['medicine'], 
        queryFn: async() => {
            try {
                const res = await axiosSecure.get('/all-medicineForAdmin');
                return res.data;
            } catch (error) {
                throw new Error(`Failed to fetch medicines: ${error.message}`);
            }
        }
    });

    if (isLoading) return <span className="loading loading-bars loading-lg"></span>;

    const handleDelete = (medicine) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/all-medicineForAdmin/${medicine._id}`);
                    console.log("Delete response:", res.data); // Debug: log the response
                    if (res.data.deleteCount > 0 || res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${medicine.name} has been deleted`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        throw new Error('Failed to delete');
                    }
                } catch (error) {
                    console.error("Delete error:", error); // Debug: log the error
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `Failed to delete ${medicine.name}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table bg-gray-200">
                    <thead>
                        <tr className="text-white bg-blue-500">
                            <th className="text-xl font-bold">#</th>
                            <th className="text-xl font-bold">Image</th>
                            <th className="text-xl font-bold">Name</th>
                            <th className="text-xl font-bold">Price</th>
                            <th className="text-xl font-bold">Discount</th>
                            <th className="text-xl font-bold">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((medicine, index) => (
                            <tr key={medicine._id}>
                                <td className="text-xl font-bold">{index + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={medicine.image_url} alt={medicine.name} />
                                        </div>
                                    </div>
                                </td>
                                <td><div className="font-bold text-xl text-gray-800">{medicine.name}</div></td>
                                <td><div className="font-bold text-xl text-gray-800">{medicine.price}</div></td>
                                <td><div className="font-bold text-xl text-gray-800">%{medicine.discount}</div></td>
                                <td>
                                    <button onClick={() => handleDelete(medicine)} className="btn btn-sm btn-danger">
                                        <RiDeleteBin6Fill /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagePro;
