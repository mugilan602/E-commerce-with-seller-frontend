import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useBuy = () => {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const buy = async (productId) => {
    if (!user) {
      setError('You need to log in to add items to the cart.');
      return;
    }

    try {
      const response = await fetch('/api/product/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(productId),
      });
      const json = await response.json();

      if (response.ok) {
        setCart(json);
        navigate('/success'); // Redirect to success page on successful purchase
      } else {
        setError(json.error || 'Failed to add item to cart.');
      }
    } catch (err) {
      console.error('Failed to add item to cart:', err); // Log error for debugging
      setError('Failed to add item to cart.');
    }
  };

  return { buy, error }; // Expose buy function and error state to the component
};
