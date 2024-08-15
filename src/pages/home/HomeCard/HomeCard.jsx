import { useState } from 'react';
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { FaCapsules, FaSyringe, FaPrescriptionBottleAlt } from 'react-icons/fa'; // Importing some relevant icons
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const HomeCard = () => {
    const [counts] = useState([]);
    const axiosCommon = useAxiosCommon();
    const axiosSecure = useAxiosSecure();

    const { data: medicines = [] } = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const res = await axiosSecure.get(`medicine`);
            return res.data;
        }
    });

    const getMedicineCount = (category) => {
        const categoryData = counts.find(count => count.category === category);
        return categoryData ? categoryData.count : 0;
    };

    // Function to select the appropriate icon based on the category
    const getCategoryIcon = (category) => {
        switch (category.toLowerCase()) {
            case 'capsules':
                return <FaCapsules className="text-teal-400 dark:text-teal-400 text-3xl" />;
            case 'syringes':
                return <FaSyringe className="text-teal-400 dark:text-teal-400 text-3xl" />;
            case 'bottles':
                return <FaPrescriptionBottleAlt className="text-teal-400 dark:text-teal-400 text-3xl" />;
            default:
                return <FaCapsules className="text-teal-400 dark:text-teal-400 text-3xl" />;
        }
    };

    return (
        <div className="py-10">
            <h2 className="text-4xl font-bold text-center mb-10 text-black">
                Explore Our Medicine Categories
            </h2>
            <p className="text-center text-teal-400 dark:text-teal-400 mb-8 max-w-xl mx-auto">
                Find the right medicines from our wide range of categories. Whether it's capsules, syringes, or bottles, we have it all!
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-8">
                {medicines.map(item => (
                    <Link
                        to={`/cardName/${item.category}`}
                        key={item._id}
                        className="max-w-lg p-6 shadow-md bg-white dark:bg-gray-800 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        <div className="flex justify-between pb-4 border-b dark:border-gray-700">
                            <div className="flex items-center space-x-2">
                                {getCategoryIcon(item.category)}
                                <p className="text-2xl font-semibold capitalize text-teal-400 dark:text-teal-400">
                                    {item.category}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <img
                                src={item.image_url}
                                alt={item.category}
                                className="w-full h-72 object-cover object-center rounded-md"
                            />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-semibold text-white">
                                {item.category}
                            </h3>
                            <p className="text-teal-400 dark:text-teal-400 mt-2">
                                Discover the best {item.category.toLowerCase()} available at Medicine House.
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomeCard;

