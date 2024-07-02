import Marquee from 'react-fast-marquee';
import { FiMail, FiPhone, FiUser } from 'react-icons/fi'; // Importing React Icons
import mojo from '../../assets/mojo.jpg';
import apple from '../../assets/apple.jpg';
import walton from '../../assets/walton.jpg';
import image1 from '../../assets/4.webp';
import image2 from '../../assets/5.jpg';
import image3 from '../../assets/5.png';

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
    return (
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 mb-10 to-pink-500 text-white py-12 px-4">
            <div className="max-w-8xl mx-auto mb-12">
                <h2 className="text-4xl font-bold text-center mb-10">Our Sponsors</h2>
                <Marquee speed={80} gradient={false} className="flex justify-center">
                    {[mojo, apple, walton, image1, image2, image3].map((image, index) => (
                        <div key={index} className="h-28 w-24 mx-6 bg-white rounded-lg shadow-md flex items-center justify-center transform transition-transform hover:scale-110">
                            <img src={image} alt={`Sponsor ${index + 1}`} className="h-16 w-16 object-contain" />
                        </div>
                    ))}
                </Marquee>
            </div>

            <div className="max-w-2xl mx-auto p-10 bg-rose-200 shadow-lg rounded-lg mb-20">
                <h1 className="text-3xl font-bold mb-2 text-center text-indigo-900">Contact With Us</h1>
                <p className="text-lg text-gray-700 font-bold text-center mb-2">Your Trusted Yusuf Pharmacy!</p>
                <p className="text-lg text-center text-gray-600">Providing quality medicines with convenience and care.</p>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-xl font-bold text-indigo-700 mb-2">
                            Name
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="h-6 w-6 text-indigo-500" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-12 pr-3 py-3 border border-indigo-300 rounded-md bg-indigo-100 text-indigo-900 placeholder-indigo-400"
                                placeholder="Your Name"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-xl font-bold text-indigo-700 mb-2">
                            Phone Number
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiPhone className="h-6 w-6 text-indigo-500" aria-hidden="true" />
                            </div>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-12 pr-3 py-3 border border-indigo-300 rounded-md bg-indigo-100 text-indigo-900 placeholder-indigo-400"
                                placeholder="Phone Number"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-xl font-bold text-indigo-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="h-6 w-6 text-indigo-500" aria-hidden="true" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-12 pr-3 py-3 border border-indigo-300 rounded-md bg-indigo-100 text-indigo-900 placeholder-indigo-400"
                                placeholder="Your Email"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-xl font-bold text-indigo-700 mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            className="focus:ring-purple-500 focus:border-purple-500 block w-full px-3 py-3 border border-indigo-300 rounded-md bg-indigo-100 text-indigo-900 placeholder-indigo-400"
                            placeholder="Your Message"
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="inline-block bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-xl font-bold"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <h1 className="text-3xl font-bold text-sky-400 mt-5 text-center">
    Share Your Experience
</h1>
<p className="text-lg text-black mb-8 text-center">
    We value your feedback! Let us know how we can improve and serve you better. Your insights help us provide the best service possible.
</p>

            <div className="max-w-8xl mx-auto grid grid-cols-3 gap-6">
                
                {fakeReviews.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center mb-3">
                            <img src={item.avatar} alt={item.user} className="h-12 w-12 rounded-full object-cover mr-3" />
                            <div>
                                <h3 className="text-lg font-bold text-indigo-900">{item.user}</h3>
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
