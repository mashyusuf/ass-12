import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const NameCard = () => {
    const { category } = useParams();
    const [medicine, setMedicine] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/allmedicine/${category}`);
                const data = await response.json();
                setMedicine(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [category]);

    return (
        <div className="py-8 bg-gray-100 dark:bg-gray-900">
            <h2 className="text-4xl font-bold text-center mb-8 text-indigo-600 dark:text-indigo-400">
                Medicines in {category}
            </h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
                {medicine.map(med => (
                    <div key={med._id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
                        <img src={med.image_url} alt={med.name} className="w-full h-72 object-cover object-center" />
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                                {med.name}
                            </h3>
                            <p className="text-md text-gray-700 dark:text-gray-300 mb-4">
                                {med.description}
                            </p>
                            <p className="text-md text-gray-700 dark:text-gray-300 mb-2">
                                Dosage: <span className="text-xl font-bold text-gray-900 dark:text-white">{med.dosage}</span>
                            </p>
                            <p className="text-md text-gray-700 dark:text-gray-300 mb-2">
                                Price: <span className="text-xl font-bold text-gray-900 dark:text-white">{med.price}</span>
                            </p>
                            <p className="text-md text-gray-700 dark:text-gray-300 mb-2">
                                Discount: <span className="text-xl font-bold text-gray-900 dark:text-white">{med.discount}</span>
                            </p>
                            <p className="text-md text-gray-700 dark:text-gray-300 mb-4">
                                Manufacturer: <span className="text-xl font-bold text-gray-900 dark:text-white">{med.manufacturer}</span>
                            </p>
                            <Link to={`/cardDetails/${med._id}`}>
                                <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300">
                                    See Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NameCard;
