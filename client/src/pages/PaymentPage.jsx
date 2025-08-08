import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'; // Create this separately
import axios from 'axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const PaymentPage = () => {
  const { id } = useParams();

  const { data: booking, isLoading, error } = useQuery({
    queryKey: ['booking', id],
    queryFn: async () => {
      const token = localStorage.getItem('access-token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    }
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !booking) return <p>Error loading booking.</p>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Payment for {booking.packageName}</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm booking={booking} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
