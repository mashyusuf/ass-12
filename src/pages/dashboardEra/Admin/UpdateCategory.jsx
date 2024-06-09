import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const UpdateCategory = () => {
    const { id } = useParams(); // Get categoryId from route params
    const [category, setCategory] = useState({});
    const [photoUrl, setPhotoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axiosSecure.get(`/update-category/${id}`);
                setCategory(response.data);
                // Assuming the category object has a 'photoUrl' property
                setPhotoUrl(response.data.photoUrl || '');
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, [axiosSecure, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedCategory = {
            category: form.category.value,
            photoUrl: photoUrl // Include the photo URL in the updated category object
        };

        try {
            setLoading(true);

            const response = await axiosSecure.put(`/update-category/${id}`, updatedCategory);
            console.log('Update response:', response.data);
            toast.success('Category updated successfully');
            navigate('/'); // Navigate to the category list page
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error('Failed to update category');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Update Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-gray-700">Category Name</label>
                    <input type="text" id="name" name="category" defaultValue={category.category} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-700" required />
                </div>
                <div>
                    <label htmlFor="photoUrl" className="block text-gray-700">Category Photo URL</label>
                    <input type="text" id="photoUrl" name="photoUrl" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-700" />
                </div>
                <button type="submit" className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}>
                    {loading ? 'Updating...' : 'Update Category'}
                </button>
            </form>
        </div>
    );
};

export default UpdateCategory;
