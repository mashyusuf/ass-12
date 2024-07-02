
import { useQuery } from '@tanstack/react-query';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind is imported
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { Carousel } from 'react-responsive-carousel';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const DiscountProductsSlider = () => {
    const  axiosSecure = useAxiosSecure()

    const fetchDiscountedProducts = async () => {
        try {
            const response = await axiosSecure.get('/discounted-products');
            console.log('Response:', response);
            return response.data;
        } catch (error) {
            console.error('Error fetching discounted products:', error);
            if (error.response) {
                console.error('Error response:', error.response);
            }
            throw new Error('Error fetching discounted products: ' + error.message);
        }
    };

    const { data: discountedProducts, error, isLoading } = useQuery({
        queryKey: ['discountedProducts'],
        queryFn: fetchDiscountedProducts
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        console.error('Error fetching discounted products:', error);
        return <div>Error fetching discounted products</div>;
    }

    return (
        <div>
            <h1 className='text-4xl text-center text-sky-600 font-bold mb-5'>Discount For Medicines </h1>
            <div className="w-full max-w-4xl mx-auto shadow-xl bg-slate-400">
                <Carousel showThumbs={false} className='p-4' showStatus={false} infiniteLoop useKeyboardArrows autoPlay>
                    {discountedProducts.map((product) => (
                        <div key={product._id} className="product-card bg-white shadow-md rounded-lg overflow-hidden">
                            <img src={product.image_url} alt={product.name} className="w-full h-96 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="text-green-500 text-xl">Discount: {product.discount}%</p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default DiscountProductsSlider;
