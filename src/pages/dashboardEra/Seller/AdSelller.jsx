import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
function AdSeller() {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure();
    const [medicines, setMedicines] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAd, setNewAd] = useState({
        name: '',
        imageUrl: '',
        description: ''
    });

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const response = await axiosSecure.get('/medicine-adver', { withCredentials: true });
            setMedicines(response.data);
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAd({ ...newAd, [name]: value });
    };

    const handleAddAdvertisement = async () => {
        try {
   
            const sellerEmail = user.email;
            const newAdWithSellerEmail = { ...newAd, sellerEmail };
            await axiosSecure.post('/Adver-medicines', newAdWithSellerEmail, { withCredentials: true });
            
            setNewAd({ name: '', imageUrl: '', description: '', status: 'true' });
            setIsModalOpen(false);

            fetchMedicines();

            toast.success('Advertisement added successfully!');
        } catch (error) {
            console.error('Error adding advertisement:', error);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <Helmet>
                <title>Medicine House | Advertisement</title>
            </Helmet>
            <h1 className="text-3xl font-bold my-6">Advertisement Management</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => setIsModalOpen(true)}
            >
                Add Advertisement
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full max-w-5xl">
                {medicines.map((medicine) => (
                    <div key={medicine._id} className="bg-white p-4 rounded shadow">
                        <h3 className="text-xl font-semibold">{medicine.name}</h3>
                        <img src={medicine.imageUrl} alt={medicine.name} className="w-full h-40 object-cover mt-2" />
                        <p className="mt-2">{medicine.description}</p>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-2xl font-bold mb-4">Add Advertisement</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Medicine Name"
                            value={newAd.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            placeholder="Image URL"
                            value={newAd.imageUrl}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={newAd.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        <button
                            onClick={handleAddAdvertisement}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdSeller;
