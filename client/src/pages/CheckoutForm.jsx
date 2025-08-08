import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CheckoutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { data: clientSecret } = await axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
      price: booking.price
    });

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: booking.userName,
          email: booking.userEmail
        }
      }
    });

    if (result.error) {
      toast.error(result.error.message);
      setLoading(false);
    } else if (result.paymentIntent.status === 'succeeded') {
      await axios.post(`${import.meta.env.VITE_API_URL}/payments`, {
        bookingId: booking._id,
        transactionId: result.paymentIntent.id
      });

      toast.success('Payment successful!');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-primary mt-4"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default CheckoutForm;
