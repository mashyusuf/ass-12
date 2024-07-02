import React from 'react';

// Sample fake review data (replace with actual data structure)
const fakeReviews = [
    {
        id: 1,
        user: 'John Doe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg', // Example avatar URL
        rating: 4.5,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla gravida est ac lacus fringilla.',
    },
    {
        id: 2,
        user: 'Jane Smith',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg', // Example avatar URL
        rating: 5,
        review: 'Sed euismod, quam ut fermentum convallis, tellus libero vestibulum ex, sit amet laoreet sapien est in ligula.',
    },
    {
        id: 3,
        user: 'Michael Brown',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg', // Example avatar URL
        rating: 4,
        review: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    },
];

const ReviewCard = ({ review }) => (
    <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center mb-4">
            <img src={review.avatar} alt={review.user} className="h-10 w-10 rounded-full mr-4" />
            <div>
                <h3 className="text-lg font-semibold text-gray-800">{review.user}</h3>
                <div className="flex items-center mt-1">
                    <span className="text-yellow-500">
                        {[...Array(Math.floor(review.rating))].map((_, index) => (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 fill-current"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 1l2.602 5.777H18l-4.146 3.75L15.79 18 10 14.573 4.21 18l1.936-6.473L2 6.777h5.398L10 1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ))}
                        {[...Array(5 - Math.floor(review.rating))].map((_, index) => (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 fill-current text-gray-400"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 1l2.602 5.777H18l-4.146 3.75L15.79 18 10 14.573 4.21 18l1.936-6.473L2 6.777h5.398L10 1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ))}
                    </span>
                    <span className="ml-2 text-gray-600">({review.rating})</span>
                </div>
            </div>
        </div>
        <p className="text-gray-700">{review.review}</p>
    </div>
);

const ReviewCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fakeReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
        ))}
    </div>
);

export { ReviewCards };
