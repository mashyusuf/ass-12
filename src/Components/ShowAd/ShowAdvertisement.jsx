import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaTag, FaHourglassEnd, FaBoxes } from 'react-icons/fa';

const ShowAdvertisement = ({ advertisements }) => {
    const settings = {
        dots: false, // Removed the dots
        infinite: true,
        speed: 500,
        slidesToShow: 2, // Display 2 cards
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768, // For tablets and smaller screens
                settings: {
                    slidesToShow: 1, // Show 1 card on smaller screens
                }
            }
        ]
    };

    const bgColors = ["bg-white", "bg-gray-100"]; // Subtle background colors for cards

    // Static promotional text
    const staticTexts = [
        "Hurry! Limited Stock Available!",
        "Exclusive Offers Coming Soon",
        "Grab Your Discounts Before It's Gone!",
        "Limited Time Offer - Don't Miss Out!",
    ];

    return (
        <div className="py-10 bg-gray-200">
            <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-12">Featured Advertisement</h2>
            <Slider {...settings}>
                {advertisements && advertisements.map((advertisement, index) => (
                    <div
                        className={`border border-gray-300 shadow-lg rounded-lg overflow-hidden relative transform hover:scale-105 transition-transform duration-300 p-4 ${bgColors[index % bgColors.length]}`}
                        key={advertisement._id}
                        style={{ margin: '0 10px' }} // Adding gap between cards
                    >
                        <div className="relative">
                            <img
                                className="mx-auto w-full h-64 object-cover rounded-lg shadow-md"
                                src={advertisement.imageUrl}
                                alt={advertisement.name}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-25 rounded-lg"></div> {/* Shadow overlay */}
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-white text-center">
                            <h3 className="text-2xl font-bold mb-2 text-orange-600">{advertisement.name}</h3>
                            <p className="text-sm mb-4 font-bold text-cyan-700">{advertisement.description.length > 100 ? advertisement.description.substring(0, 97) + '...' : advertisement.description}</p>
                            <p className="text-lg font-semibold mb-4 text-orange-500">{staticTexts[index % staticTexts.length]}</p>
                            <div className="flex justify-center space-x-4">
                                <FaTag className="text-2xl text-orange-600" />
                                <FaHourglassEnd className="text-2xl text-orange-600" />
                                <FaBoxes className="text-2xl text-orange-600" />
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

ShowAdvertisement.propTypes = {
    advertisements: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ),
};

export default ShowAdvertisement;
