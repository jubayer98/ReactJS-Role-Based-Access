import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
    const { user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const { price, _id, slot_duration, slot_timing, name } = location.state;
    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await fetch('http://localhost:3000/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ price: price * 100 }) // Price in cents
                });
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error('Failed to fetch client secret:', error);
            }
        };

        fetchClientSecret();
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const billingDetails = {
            name: user?.displayName || 'Anonymous',
            email: user?.email || 'no-email@example.com'
        };

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: billingDetails,
            },
        });

        if (error) {
            console.error('Payment error:', error);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded!');
            saveTransactionDetails(paymentIntent.id);
        }
    };

    const saveTransactionDetails = async (transactionId) => {
        try {
            const response = await fetch('http://localhost:3000/save-payment-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    transactionId,
                    userName: user?.displayName,
                    email: user?.email,
                    price,
                    trainerId: _id,
                    trainerName: name,
                    slotDuration: slot_duration,
                    slotTiming: slot_timing,
                }),
            });
            const data = await response.json();
            console.log('Transaction saved:', data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Payment Successful. Redirecting...",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/");
        } catch (error) {
            console.error('Error saving transaction:', error);
            Swal.fire({
                position: "top-end",
                icon: 'error',
                title: 'Oops...',
                text: 'Request failed! Please try again.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-4 mb-4 text-center">
                <h2 className="text-lg font-semibold">Confirm Your Booking</h2>
                <p className="text-gray-700">Price: ${price}</p>
                <p className="text-gray-700">Slot Timing: {slot_timing} ({slot_duration} hours)</p>
            </div>
            <CardElement />
            <button type="submit" disabled={!stripe} className="mt-4 inline-flex w-full items-center justify-center gap-2 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300">
                Pay ${price}
            </button>
        </form>
    );
};

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default Payment;