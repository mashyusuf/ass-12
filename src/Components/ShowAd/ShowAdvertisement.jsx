import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ShowAdvertisement = ({ advertisements }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1, // Display only one slide at a time
        slidesToScroll: 1
    };

    return (
        <div className="bg-gray-200 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Advertisement</h2>
            <Slider {...settings}>
                {advertisements && advertisements.map(advertisement => (
                    <div className="text-center" key={advertisement._id}>
                        <img className="mx-auto max-w-full" src={advertisement.imageUrl} alt={advertisement.name} />
                        <h3 className="text-3xl font-bold mb-4">{advertisement.name}</h3>
                        <p className="text-lg font-bold">{advertisement.description}</p>
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
