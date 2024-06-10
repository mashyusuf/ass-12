import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteModal from "../../../Components/Modal/DeleteModal";
import toast from "react-hot-toast";
import { Helmet } from 'react-helmet-async';
const Mylistings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
    };

    //-----Tan stack query ----- fetch data----
    const { data: medicines = [], isLoading ,refetch} = useQuery({
        queryKey: ['my-listing', user?.email], // Corrected query key
        queryFn: async () => {
            try {
                // Fetch data from API
                const { data } = await axiosSecure.get(`/my-listings/${user?.email}`);
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw new Error('Error fetching data');
            }
        }
    });

    //--------Delete-------

    const {mutateAsync} = useMutation({
        mutationFn: async id =>{
            const {data} = await axiosSecure.delete(`/medicine-delete/${id}`)
            return data
        } ,  
        onSuccess: data =>{
            console.log(data)
            refetch()
            toast.success('Successfully Delete')
            
        } 
    })

    //-----HandleDelete--------
    const handleDelete = async (id) => {
        console.log("Deleting item with ID:", id);
        try{
            await mutateAsync(id)
        } catch(err){
            console.log(err)
        }
        
        closeModal(); // Close the modal after deletion
    };

    // If data is still loading, display a loading spinner
    if (isLoading) return <span className="loading loading-bars loading-lg"></span>;

    return (
        <div className="bg-gray-100 py-8 px-4">
            <Helmet>
                <title>Medicine House | My List</title>
            </Helmet>
            <h1 className="text-2xl font-bold mb-4">My Listing Page: {medicines.length}</h1>
            <div className="overflow-x-auto">
                <table className="table w-full text-md md:text-xl bg-white shadow-md rounded-lg">
                    {/* Table Head */}
                    <thead className="bg-gray-200 text-xl font-bold">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Company</th>
                            <th className="px-4 py-2">Discount</th>
                            <th className="px-4 py-2">Update</th>
                            <th className="px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {medicines.map(medicine => (
                            <tr key={medicine._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2">
                                    {/* Render medicine details */}
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={medicine.image_url} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>{medicine.name}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-2">{medicine.price}</td>
                                <td className="px-4 py-2">{medicine.category}</td>
                                <td className="px-4 py-2">{medicine.manufacturer}</td>
                                <td className="px-4 py-2">{medicine.discount}%</td>
                                <td className="px-4 py-2">
                                    <button className="btn btn-ghost btn-xs bg-blue-500 text-white rounded-full p-2">
                                        <FaEdit />
                                    </button>
                                </td>
                                <td className="px-4 py-2">
                                    <button onClick={() => {
                                        setSelectedItemId(medicine._id);
                                        setIsOpen(true);
                                    }} className="btn btn-ghost btn-xs bg-red-500 text-white rounded-full p-2">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Delete Modal */}
            <DeleteModal
                isOpen={isOpen}
                closeModal={closeModal}
                handleDelete={() => handleDelete(selectedItemId)}
            />
        </div>
    );
};

export default Mylistings;
