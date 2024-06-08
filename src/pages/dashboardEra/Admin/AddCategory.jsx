
import { imageUpload } from '../../../api/utils';
import  { axiosSecure } from '../../../hooks/useAxiosSecure';
import toast, { Toaster } from 'react-hot-toast';
import cate from '../../../assets/cate.jpg';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const category = form.category.value;
        const image = form.image.files[0];

        try {
            // Upload image and get URL
            const image_url = await imageUpload(image);
            console.log(image_url);
            const uploadedImageUrl = await imageUpload(image_url);

            // Prepare form data
            const formData = {
                category,
                image_url: uploadedImageUrl,
            };

            // Post data to backend
            const response = await axiosSecure.post('/add-category', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Category added:', response.data);
            
            // Show success toast
            toast.success('Category added successfully!');
            navigate('/')
        } catch (error) {
            console.error('Error adding category:', error);
            
            // Show error toast
            toast.error('Error adding category');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
            <Toaster />
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-8">
                    <img src={cate} alt="" className="w-24 h-auto mx-auto mb-4" />
                </div>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='name' className='block mb-2 text-lg font-bold'>
                                Give Me Your Category Name
                            </label>
                            <input
                                type='text'
                                name='category'
                                id='name'
                                placeholder='Enter Your Category Here'
                                className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-rose-500 text-lg'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <label htmlFor='image' className='block mb-2 text-lg font-bold'>
                                Select Image:
                            </label>
                            <input
                                required
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                                className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-rose-500 text-lg'
                            />
                        </div>
                    </div>
                    <button className="btn btn-outline w-full" type="submit">Add Medicine</button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
