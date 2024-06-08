import { useState } from "react";
import { FiArrowUpRight, FiEye, FiX } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import { useQuery } from "@tanstack/react-query";

const Shop = () => {
    const [asc, setAsc] = useState(true);
    const [search, setSearch] = useState('');
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure();
    const [selectedMedicine, setSelectedMedicine] = useState(null);

    const { data: medicines = [], isLoading } = useQuery({
        queryKey: ['medicines', asc, search], // Add 'asc' and 'search' to queryKey to refetch when sorting order or search changes
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/shop-medicine?sort=${asc ? 'asc' : 'desc'}&search=${search}`);
            console.log('Fetched data:', data); // Log the fetched data
            return data;
        }
    });

    // Function to handle selection of a medicine
    const handleSelectMedicine = (medicine) => {
        if (user && user.email) {
            const cartItem = {
                shopId: medicine._id,
                email: user.email,
                name: medicine.name,
                price: medicine.price,
                discount: medicine.discount, 
                sellerEmail : medicine.seller?.email,
                sellerName : medicine.seller?.name
                };
            console.log(cartItem,'shop line41')

        

            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `Your Cart Has Been Added`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // Refetch cart to update the cart
                        refetch();
                    }
                })
                .catch(error => {
                    console.error('Error adding to cart:', error);
                });
        } else {
            Swal.fire({
                title: "You are Not Logged In?",
                text: "Please Login To Add To The Cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }
        console.log("Medicine selected:", medicine);
    };

    // Function to handle opening modal to view medicine details
    const handleOpenModal = (medicine) => {
        setSelectedMedicine(medicine); // Set selected medicine to display in modal
    };

    // Function to close modal
    const handleCloseModal = () => {
        setSelectedMedicine(null); // Clear selected medicine when modal is closed
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const searchText = e.target.search.value;
        console.log('Search text:', searchText); // Log the search text
        setSearch(searchText);
    }

    if (isLoading) return <span className="loading loading-bars loading-lg"></span>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-8">This is shop: {medicines.length}</h1>
            <div className="flex flex-col md:flex-row justify-evenly items-center mb-10 space-y-4 md:space-y-0">
    <form className="flex items-center space-x-2 w-full md:w-auto" onSubmit={handleSearch}>
        <input 
            name="search" 
            type="text" 
            className="px-4 py-3 rounded-full border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            placeholder="Search..."
        />
        <input 
            type="submit" 
            value="Search" 
            className="px-4 py-3 rounded-full bg-blue-500 text-white cursor-pointer hover:bg-blue-600 w-full md:w-auto"
        />
    </form>
    <button 
        onClick={() => setAsc(!asc)} 
        className="text-xl px-6 py-3 rounded-full bg-yellow-400 text-black hover:bg-yellow-500 transition-colors duration-300 w-full md:w-auto"
    >
        {asc ? 'PRICE: LOW TO HIGH' : 'PRICE: HIGH TO LOW'}
    </button>
</div>




            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto p-4">
                {medicines.map(medicine => (
                    <div key={medicine._id} className="card bg-white shadow-lg rounded-lg overflow-hidden">
                        <figure className="relative">
                            <img className="w-full h-72 object-cover" src={medicine.image_url} alt={medicine.name} />
                        </figure>
                        <div className="card-body p-6 bg-gradient-to-r from-blue-50 to-indigo-100">
                            <h2 className="card-title text-2xl font-bold text-indigo-700 mb-4">{medicine.name}</h2>
                            <div className="flex flex-col gap-2">
                                <p className="flex items-center text-lg"><FiArrowUpRight className="mr-2 text-xl text-blue-500" />Dosage: <span className="font-bold ml-2">{medicine.dosage}</span></p>
                                <p className="flex items-center text-lg"><FiArrowUpRight className="mr-2 text-xl text-green-500" />Price: <span className="font-bold ml-2">${medicine.price}</span></p>
                                <p className="flex items-center text-lg"><FiArrowUpRight className="mr-2 text-xl text-yellow-500" />Manufacturer: <span className="font-bold ml-2">{medicine.manufacturer}</span></p>
                                <p className="flex items-center text-lg"><FiArrowUpRight className="mr-2 text-xl text-red-500" />Discount: <span className="font-bold ml-2">{medicine.discount}%</span></p>
                            </div>
                            <div className="card-actions justify-between mt-4">
                                <button onClick={() => handleOpenModal(medicine)} className="btn btn-primary bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"><span><FiEye /></span> View</button>
                                <button  onClick={() => handleSelectMedicine(medicine)} className="btn btn-primary bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300">Select To Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Modal JSX */}
            {selectedMedicine && (
                <div className="fixed inset-0 flex mt-20 items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 max-w-lg mx-auto rounded-lg relative">
                        <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                            <FiX size={24} />
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{selectedMedicine.name}</h2>
                        <img className="w-full h-72 object-cover mb-4" src={selectedMedicine.image_url} alt={selectedMedicine.name} />
                        <p className="text-lg"><span className="font-semibold text-indigo-700">Dosage:</span> {selectedMedicine.dosage}</p>
                        <p className="text-lg"><span className="font-semibold text-indigo-700">Price:</span> {selectedMedicine.price}</p>
                        <p className="text-lg"><span className="font-semibold text-indigo-700">Manufacturer:</span> {selectedMedicine.manufacturer}</p>
                        <p className="text-lg"><span className="font-semibold text-indigo-700">Discount:</span> {selectedMedicine.discount}%</p>
                        <p className="text-lg"><span className="font-semibold text-indigo-700">Description:</span> {selectedMedicine.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shop;
