import { useQuery } from '@tanstack/react-query';
import 'tailwindcss/tailwind.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { FaTag } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';

const DiscountProductsSlider = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [cart, refetch] = useCart();

    const fetchDiscountedProducts = async () => {
        try {
            const response = await axiosSecure.get('/discounted-products');
            return response.data;
        } catch (error) {
            console.error('Error fetching discounted products:', error);
            throw new Error('Error fetching discounted products: ' + error.message);
        }
    };

    const { data: discountedProducts, error, isLoading } = useQuery({
        queryKey: ['discountedProducts'],
        queryFn: fetchDiscountedProducts
    });

    const handleSelectMedicine = (medicine) => {
        if (user && user.email) {
            const cartItem = {
                shopId: medicine._id,
                email: user.email,
                name: medicine.name,
                price: medicine.price,
                discount: medicine.discount, 
                sellerEmail: medicine.seller?.email,
                sellerName: medicine.seller?.name
            };

            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `Your Cart Has Been Added`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })
                .catch(error => {
                    console.error('Error adding to cart:', error);
                });
        } else {
            Swal.fire({
                title: "You are Not Logged In?",
                text: "Please Login To Add To The Cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching discounted products</div>;

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    return (
        <div className="py-8">
            <h1 className='text-4xl text-center text-sky-600 font-bold mb-5'>Special Discounts on Medicines</h1>
            <div className="w-full max-w-6xl mx-auto shadow-xl bg-white p-6 rounded-lg">
                <Carousel 
                    showThumbs={false} 
                    showStatus={false} 
                    showIndicators={false}
                    infiniteLoop 
                    useKeyboardArrows 
                    autoPlay 
                    interval={3000}
                    centerMode
                    centerSlidePercentage={33.33}
                    responsive={[
                        {
                            breakpoint: 768, // For small devices
                            settings: {
                                slidesToShow: 1, // Show 1 card
                                centerMode: false, // Disable center mode for smaller screens
                            },
                        },
                    ]}
                >
                    {discountedProducts.map((product) => (
                        <div key={product._id} className="product-card bg-gray-100 shadow-md rounded-lg overflow-hidden relative mx-3">
                            <div className="relative">
                                <img src={product.image_url} alt={product.name} className="w-full h-60 md:h-72 object-cover rounded-t-lg" />
                                <div className="absolute top-2 left-2 bg-red-500 text-white py-1 px-3 rounded-full text-lg font-bold">
                                    {product.discount}% OFF
                                </div>
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-2xl font-semibold text-red-500 mb-2">Special Discount</h3>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                                <p className="text-gray-600 mb-4">{truncateText(product.description, 7)}</p> {/* Truncate description to 7 words */}
                                <button 
                                    onClick={() => handleSelectMedicine(product)} 
                                    className="mt-2 bg-sky-500 text-white py-2 px-6 rounded-full hover:bg-sky-600 transition duration-300"
                                >
                                    <FaTag className="inline-block mr-2" /> Add To Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default DiscountProductsSlider;
