import { useState } from 'react';
import { imageUpload } from '../../../api/utils';
import { axiosSecure } from '../../../hooks/useAxiosSecure';
import toast, { Toaster } from 'react-hot-toast';
import { MdEdit, MdDelete } from 'react-icons/md';
import cate from '../../../assets/cate.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2'; // Import Swal for the confirmation dialog

const AddCategory = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { data: categories = [], isLoading, refetch } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axiosSecure.get(`admin-category`);
            return res.data;
        },
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const category = form.category.value;
        const image = form.image.files[0];

        try {
            setLoading(true);

            // Upload image and get URL
            const image_url = await imageUpload(image);

            // Prepare form data
            const formData = {
                category,
                image_url,
            };

            // Post data to backend
            const response = await axiosSecure.post('/add-category', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Show success toast
            toast.success('Category added successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error adding category:', error);

            // Show error toast
            toast.error('Error adding category');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (item) => {
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
                    const res = await axiosSecure.delete(`/delete-category/${item._id}`); // Update the endpoint URL
                    console.log("Delete response:", res.data); // Debug: log the response
                    if (res.data.deleteCount > 0 || res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${item.category} has been deleted`,
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
                        title: `Failed to delete ${item.category}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    };
    const handleUpdate = async (categoryId, updatedData) => {
        try {
            const response = await axiosSecure.put(`/update-category/${categoryId}`, updatedData);
            console.log('Update response:', response.data); // Debug: log the response
            toast.success('Category updated successfully');
            // Optionally, you can refetch the category list or update the category state
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };
    
    

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
            <Toaster />
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
                <div className="mb-8 text-center">
                    <img src={cate} alt="" className="w-24 h-auto mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-indigo-700">Add Category</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-lg font-bold text-gray-800">
                                Category Name
                            </label>
                            <input
                                type="text"
                                name="category"
                                id="name"
                                placeholder="Enter Category Name"
                                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-700 text-lg"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="block mb-2 text-lg font-bold text-gray-800">
                                Select Image:
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-700 text-lg"
                                required
                            />
                        </div>
                    </div>
                    <button
                        className={`btn btn-outline w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Category'}
                    </button>
                </form>
            </div>
            <div className="overflow-x-auto mt-8 w-full max-w-xl">
                <table className="table w-full">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="w-1/6 text-lg font-bold py-2 px-4">No</th>
                            <th className="w-3/6 text-lg font-bold py-2 px-4">Name</th>
                            <th className="w-2/6 text-lg font-bold py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((item, index) => (
                            <tr key={item._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                                <td className="text-lg font-bold py-2 px-4">{index + 1}</td>
                                <td className="py-2 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image_url} alt={item.category} />
                                            </div>
                                        </div>
                                        <div className="font-bold text-lg">{item.category}</div>
                                    </div>
                                </td>
                                <td className="py-2 px-4">
                                <Link to={`/dashboard/updateCategory/${item._id}`}> <button onClick={()=> handleUpdate(item)} className="btn btn-icon text-indigo-700" aria-label="Edit">
                                        <MdEdit />
                                    </button>
                                   </Link>
                                    <button onClick={() => handleDelete(item)} className="btn btn-icon text-red-700" aria-label="Delete">
                                        <MdDelete />
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

export default AddCategory;
