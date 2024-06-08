import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState();
    const [transactionId, setTransactionId] = useState('');
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [cart, refetch] = useCart();
    console.log(cart)
    const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price.replace("$", "")), 0);
    const sellerEmail = cart.map(item => item.sellerEmail)
    const sellerName = cart.map(item => item.sellerName)
    const medicineName = cart.map(item => item.name)
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            console.error('Your Payment Is Error', error);
            setError(error.message);
            return;
        } else {
            console.log('Payment Method', paymentMethod);
            setError('');
        }

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email || 'anonymous',
                    name: user.displayName || 'anonymous'
                }
            }
        });
        if (confirmError) {
            console.error('Confirm Error:', confirmError);
            return;
        } else {
            console.log('Payment Intent', paymentIntent);

            // Debug cart items and seller emails
            console.log('Cart Items:', cart);
            // Save payment in the database
            try {
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    sellerEmail,
                    sellerName,
                    medicineName,
                    cartIds: cart.map(item => item._id),
                    status: 'pending',
                };

                const res = await axiosSecure.post('payments', payment);
                console.log('Payment Saved', res.data);
                refetch();
                if (paymentIntent.status === 'succeeded') {
                    console.log('Transaction ID', paymentIntent.id);
                    setTransactionId(paymentIntent.id);
                    // Show success toast
                    toast.success('Payment Successful!', {
                        duration: 5000,
                        position: 'top-center',
                        style: {
                            backgroundColor: '#4caf50',
                            color: '#ffffff',
                            fontWeight: 'bold',
                        },
                        icon: '🎉',
                        role: 'status',
                        ariaLive: 'polite',
                    });
                }
                navigate('/dashboard/history');
            } catch (error) {
                console.error('Error saving payment:', error);
                // Handle error, display error message to the user
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '18px',
                            color: '#4A5568',
                            '::placeholder': {
                                color: '#A0AEC0',
                            },
                        },
                        invalid: {
                            color: '#E53E3E',
                        },
                    },
                }}
                className="p-3 border border-gray-400 rounded-md mb-4 focus:border-blue-500 focus:ring-blue-500 font-bold"
            />
            <button disabled={!stripe || !clientSecret} className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors duration-300 border border-blue-700" type="submit"> 
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && (
               <p className="mt-10 " style={{ color: 'blue', fontWeight: 'bold' }}>
                  Your Transaction Id: {transactionId}
               </p>
            )}
        </form>
    );
};

export default CheckoutForm;
