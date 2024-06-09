import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

function ManageBannerAdvertise() {
    const axiosSecure = useAxiosSecure();
    const [advertiseMedicines, setAdvertiseMedicines] = useState([]);

    useEffect(() => {
        fetchAdvertiseMedicines();
    }, []);
    const { data: advertiseMedicine=[]} = useQuery({
        queryKey:['advertiseMedicine'],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/advertise-medicines`, { withCredentials: true })
            return res.data;
        }
    })
    console.log(advertiseMedicine)

    const fetchAdvertiseMedicines = async () => {
        try {
            const response = await axiosSecure.get('/advertise-medicines', { withCredentials: true });
            setAdvertiseMedicines(response.data);
        } catch (error) {
            console.error('Error fetching advertisement medicines:', error);
        }
    };

    const handleToggleSlide = async (id, addToSlide) => {
        try {
            await axiosSecure.put(`/toggle-advertisement-slide/${id}`, { addToSlide }, { withCredentials: true });
            fetchAdvertiseMedicines(); // Refresh advertise medicines after toggling
            if (addToSlide) {
                toast.success('Advertisement added to slide!');
            } else {
                toast.success('Advertisement removed from slide!');
            }
        } catch (error) {
            console.error('Error toggling advertisement slide:', error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold my-6">Manage Banner Advertise</h1>
            <table className="w-full bg-gray-200">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="p-4">Medicine Image</th>
                        <th className="p-4">Medicine Name</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Seller Email</th>
                        <th className="p-4">Add to Slide</th>
                    </tr>
                </thead>
                <tbody>
                    {advertiseMedicines.map((medicine) => (
                        <tr key={medicine._id} className="bg-white">
                            <td className="p-4"><img src={medicine.imageUrl} alt={medicine.name} style={{ width: '100px', height: '100px' }} /></td>
                            <td className="p-4 font-semibold">{medicine.name}</td>
                            <td className="p-4">{medicine.description}</td>
                            <td className="p-4">{medicine.sellerEmail}</td>
                            <td className="p-4">
                                <button className={`px-4 py-2 rounded ${medicine.status ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`} onClick={() => handleToggleSlide(medicine._id, !medicine.status)}>
                                    {medicine.status ? 'Remove from Slide' : 'Add to Slide'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageBannerAdvertise;
