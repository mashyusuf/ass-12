import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const HomeCard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/medicine');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <div className='grid md:grid-cols-3 lg:grid-cols-3 max-w-7xl mx-auto gap-8'>
                {data.map(item => (
                    <Link to={`/cardName/${item.category}`} key={item._id} className="max-w-lg p-4 shadow-md bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                        <div className="flex justify-between pb-4 border-b dark:border-gray-700">
                            <div className="flex">
                                <p className="text-xl font-semibold capitalize dark:text-gray-300">Medicine House</p>
                            </div>
                            <div className="text-lg">Total Number Of Medicines Available: <span className='font-bold text-md'>{item.num_medicines}</span></div>
                        </div>
                        <div className="mt-4">
                            <img src={item.image_url} alt="" className="w-full h-72 object-cover object-center rounded-md" />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">{item.category}</h3>
                            <p className="mt-2 text-gray-700 dark:text-gray-300">Available Medicines: 5
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomeCard;

