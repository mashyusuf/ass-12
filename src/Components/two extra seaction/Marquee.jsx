import React from 'react';
import Marquee from 'react-fast-marquee';
import { FiMail, FiPhone, FiUser } from 'react-icons/fi'; // Importing React Icons
import bg from '../../assets/umbg.jpg'; // Your background image
import Swal from 'sweetalert2'; // Import SweetAlert2


const fakeReviews = [
    {
        id: 1,
        user: 'John Doe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg', // Example avatar URL
        rating: 4.5,
        review: 'Excellent service! They delivered my medicine on time and the packaging was great.',
    },
    {
        id: 2,
        user: 'Jane Smith',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg', // Example avatar URL
        rating: 5,
        review: 'Yusuf Pharmacy has a wide range of medicines. I always find what I need.',
    },
    {
        id: 3,
        user: 'Michael Brown',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg', // Example avatar URL
        rating: 4,
        review: 'Their customer support is very helpful. They answered all my queries promptly.',
    },
    // Add more reviews to total 9
    {
        id: 4,
        user: 'Emma White',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        rating: 3.5,
        review: 'Good experience overall, but delivery could be faster.',
    },
    {
        id: 5,
        user: 'James Green',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        rating: 4.5,
        review: 'I like their online ordering system. It\'s very user-friendly.',
    },
    {
        id: 6,
        user: 'Olivia Davis',
        avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
        rating: 4,
        review: 'The prices are competitive and they offer discounts on bulk orders.',
    },
    {
        id: 7,
        user: 'William Taylor',
        avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
        rating: 5,
        review: 'Highly recommended! Reliable and trustworthy pharmacy.',
    },
    {
        id: 8,
        user: 'Sophia Martinez',
        avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
        rating: 4,
        review: 'I\'ve been a customer for years and never had any issues with their products.',
    },
    {
        id: 9,
        user: 'Noah Garcia',
        avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
        rating: 4.5,
        review: 'Great service! The staff is courteous and knowledgeable.',
    },
];

const MarqueeSection = () => {
    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Thank you!',
            text: 'Your message has been sent successfully.',
            icon: 'success',
            confirmButtonText: 'Close'
        });
    };

    return (
        <div 
            className="bg-cover bg-center p-10 mb-10" 
            style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
            <div className="max-w-4xl mx-auto bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Contact Us</h1>
                <p className="text-lg text-center text-gray-600 mb-8">
                    For Brixton Online Store Inquiries
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <h2 className="text-lg font-bold text-gray-800">Hours of Operation</h2>
                        <p className="text-sm text-gray-600">9:00 to 17:00, Mon-Fri (Excluding Holidays)</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-lg font-bold text-gray-800">Phone</h2>
                        <p className="text-sm text-gray-600">+8801729804092</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-lg font-bold text-gray-800">General Inquiries</h2>
                        <p className="text-sm text-gray-600">info@yusufpharmacy.com</p>
                    </div>
                </div>
                <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-lg font-bold text-gray-800">
                            Name
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Your Name"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-lg font-bold text-gray-800">
                            Phone Number
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiPhone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Phone Number"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-bold text-gray-800">
                            Email Address
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Your Email"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-lg font-bold text-gray-800">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            required
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Your Message"
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-lg font-bold"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>

            <h1 className="text-3xl font-bold text-white mt-10 text-center">Share Your Experience</h1>
            <p className="text-lg text-white mb-8 text-center">Your feedback helps us improve and serve you better.</p>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {fakeReviews.map((item) => (
                    <div key={item.id} className="bg-white bg-opacity-90 rounded-lg shadow-md p-4">
                        <div className="flex items-center mb-3">
                            <img src={item.avatar} alt={item.user} className="h-12 w-12 rounded-full object-cover mr-3" />
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">{item.user}</h3>
                                <div className="flex items-center text-yellow-400">
                                    {Array.from({ length: Math.floor(item.rating) }, (_, index) => (
                                        <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 0l2.5 6.25H20l-5 3.75 1.875 6.25-5.625-3.75-5.625 3.75L5 10l-5-3.75h7.5L10 0z"
                                            />
                                        </svg>
                                    ))}
                                    {item.rating % 1 !== 0 && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 0l2.5 6.25H20l-5 3.75 1.875 6.25-5.625-3.75-5.625 3.75L5 10l-5-3.75h7.5L10 0z"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-700">{item.review}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarqueeSection;
