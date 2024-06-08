import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import ChekOutFrom from './ChekOutFrom';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);

const Payment = () => {
    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
            <ChekOutFrom ></ChekOutFrom>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;