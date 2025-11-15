'use client';
import { CheckoutProvider } from '@stripe/react-stripe-js/checkout';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { ShippingFormInputs } from '@repo/types';
import useCartStore from '@/app/stores/cardStore';

const stripe = loadStripe(
    'pk_test_51SSdaxLaKSYmF8uO2sd18etWp6ZrTuzebFDuiG9OiOtERKBPTFJxQeKMQb0eWmnjzIkNf52uikKOHZoh1YwyHX7k00o9ycyh8r'
);

const StripePaymentForm = ({ shippingForm }: { shippingForm: ShippingFormInputs }) => {
    const { getToken } = useAuth();
    const { cart } = useCartStore();

    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        getToken().then((token) => setToken(token));
    }, []);

    useEffect(() => {
        if (!token) return;

        fetch(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`, {
            method: 'POST',
            body: JSON.stringify({ cart }),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json) => setClientSecret(json.checkoutSessionClientSecret));
    }, [token]);

    if (!clientSecret) return <div>Loading payment...</div>;

    console.log({ clientSecret });

    return (
        <div>
            <CheckoutProvider stripe={stripe} options={{ clientSecret }}>
                <CheckoutForm shippingForm={shippingForm} />
            </CheckoutProvider>
        </div>
    );
};

export default StripePaymentForm;
