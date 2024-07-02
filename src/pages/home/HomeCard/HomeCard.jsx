import {  useState } from 'react';
import { Link } from "react-router-dom";
import useAxiosCommon from '../../../hooks/useAxiosCommon'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const HomeCard = () => {
    const [counts] = useState([]);
    const axiosCommon = useAxiosCommon()
    const axiosSecure = useAxiosSecure()

    const { data: medicines=[]} = useQuery({
        queryKey:['data'],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`medicine`)
            return res.data;
        }
    })
    console.log(medicines)


    const getMedicineCount = (category) => {
        const categoryData = counts.find(count => count.category === category);
        console.log(`Finding count for category: ${category}`, categoryData); // Add logging
        return categoryData ? categoryData.count : 0;
    };

    return (
        <div>
            <div className='grid md:grid-cols-3 lg:grid-cols-3 max-w-7xl mx-auto gap-8'>
                {medicines.map(item => (
                    <Link to={`/cardName/${item.category}`} key={item._id} className="max-w-lg p-4 shadow-md bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                        <div className="flex justify-between pb-4 border-b dark:border-gray-700">
                            <div className="flex">
                                <p className="text-xl font-semibold capitalize dark:text-gray-300">Medicine House</p>
                            </div>
                            <div className="text-lg">Total Number Of Medicines Available: <span className='font-bold text-md'>{getMedicineCount(item.category)}</span></div>
                        </div>
                        <div className="mt-4">
                            <img src={item.image_url} alt="" className="w-full h-72 object-cover object-center rounded-md" />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">{item.category}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomeCard;
