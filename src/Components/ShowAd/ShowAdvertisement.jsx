import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ShowAdvertisement = ({ advertisements }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const bgColors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-purple-500", "bg-yellow-500"];

    return (
        <div className="py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Advertisement</h2>
            <Slider {...settings}>
                {advertisements && advertisements.map((advertisement, index) => (
                    <div
                        className={`text-center rounded-lg overflow-hidden ${bgColors[index % bgColors.length]}`}
                        key={advertisement._id}
                    >
                        <img
                            className="mx-auto w-full h-auto"
                            src={advertisement.imageUrl}
                            alt={advertisement.name}
                        />
                        <div className="p-4">
                            <h3 className="text-3xl font-bold mb-4">{advertisement.name}</h3>
                            <p className="text-lg font-bold">{advertisement.description}</p>
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
