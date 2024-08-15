import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaShoppingCart, FaStar, FaCommentDollar, FaEnvelope } from 'react-icons/fa';

import img1 from '../../assets/img4.webp';
import img2 from '../../assets/img1.webp';
import img3 from '../../assets/img2.jpg';
import img5 from '../../assets/img3.png';
import img6 from '../../assets/img5.jpg';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <Carousel
            className='relative text-center mb-10'
            showArrows={true}
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            infiniteLoop={true}
            interval={5000}
            transitionTime={1000}
        >
            <div className='relative'>
                <img className='w-full h-[70vh] object-cover shadow-lg' src={img2} alt="Medicine Image 1" />
                <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black via-transparent to-transparent text-white p-8 md:p-12'>
                    <h2 className='text-5xl md:text-6xl font-extrabold mb-6 text-orange-400'>Welcome to Medicine House</h2>
                    <p className='text-xl md:text-2xl mb-6 text-orange-300'>Your one-stop shop for all pharmaceutical needs.</p>
                    <p className='text-base md:text-lg mb-6 text-orange-200'>Explore our wide range of medicines and healthcare products.</p>
                    <Link to={'/shop'} className='flex items-center bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300 text-lg md:text-xl'>
                        <FaShoppingCart className='mr-3 text-2xl' /> Shop Now
                    </Link>
                </div>
            </div>
            <div className='relative'>
                <img className='w-full h-[70vh] object-cover shadow-lg' src={img1} alt="Medicine Image 2" />
                <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black via-transparent to-transparent text-white p-8 md:p-12'>
                    <h2 className='text-5xl md:text-6xl font-extrabold mb-6 text-orange-400'>Top Quality Medicines</h2>
                    <p className='text-xl md:text-2xl mb-6 text-orange-300'>We offer premium brands and trusted quality products.</p>
                    <p className='text-base md:text-lg mb-6 text-orange-200'>Experience unmatched reliability with every purchase.</p>
                    <a href="#browse" className='flex items-center bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300 text-lg md:text-xl'>
                        <FaStar className='mr-3 text-2xl' /> Browse Products
                    </a>
                </div>
            </div>
            <div className='relative'>
                <img className='w-full h-[70vh] object-cover shadow-lg' src={img3} alt="Medicine Image 3" />
                <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black via-transparent to-transparent text-white p-8 md:p-12'>
                    <h2 className='text-5xl md:text-6xl font-extrabold mb-6 text-orange-400'>Affordable Prices</h2>
                    <p className='text-xl md:text-2xl mb-6 text-orange-300'>Get the best deals and discounts on your favorite medicines.</p>
                    <p className='text-base md:text-lg mb-6 text-orange-200'>Shop with us and save more on essential healthcare products.</p>
                    <a href="#offers" className='flex items-center bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300 text-lg md:text-xl'>
                        <FaCommentDollar className='mr-3 text-2xl' /> View Offers
                    </a>
                </div>
            </div>
            <div className='relative'>
                <img className='w-full h-[70vh] object-cover shadow-lg' src={img5} alt="Medicine Image 4" />
                <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black via-transparent to-transparent text-white p-8 md:p-12'>
                    <h2 className='text-5xl md:text-6xl font-extrabold mb-6 text-orange-400'>Trusted by Many</h2>
                    <p className='text-xl md:text-2xl mb-6 text-orange-300'>Join our growing community of satisfied customers.</p>
                    <p className='text-base md:text-lg mb-6 text-orange-200'>We are committed to providing exceptional service and quality.</p>
                    <a href="#testimonials" className='flex items-center bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300 text-lg md:text-xl'>
                        <FaStar className='mr-3 text-2xl' /> Read Testimonials
                    </a>
                </div>
            </div>
            <div className='relative'>
                <img className='w-full h-[70vh] object-cover shadow-lg' src={img6} alt="Medicine Image 5" />
                <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black via-transparent to-transparent text-white p-8 md:p-12'>
                    <h2 className='text-5xl md:text-6xl font-extrabold mb-6 text-orange-400'>Contact Us Today</h2>
                    <p className='text-xl md:text-2xl mb-6 text-orange-300'>We’re here to assist you with all your queries and concerns.</p>
                    <p className='text-base md:text-lg mb-6 text-orange-200'>Reach out to us for any support or information.</p>
                    <a href="mailto:support@medicinehouse.com" className='flex items-center bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300 text-lg md:text-xl'>
                        <FaEnvelope className='mr-3 text-2xl' /> Email Us
                    </a>
                </div>
            </div>
        </Carousel>
    );
};

export default Banner;
