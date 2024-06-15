import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useCart = () => {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Fetch the user's cart from the server
  const fetchCart = async () => {
    if (!user) {
      setError('You need to log in to view the cart.');
      return;
    }

    try {
      const response = await fetch('/api/product/getCart', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setCart(json);
      } else {
        setError(json.error || 'Failed to fetch cart.');
      }
    } catch (err) {
      setError('Failed to fetch cart.');
    }
  };

  // Add an item to the cart
  const addToCart = async (productId) => {
    if (!user) {
      setError('You need to log in to add items to the cart.');
      return;
    }
console.log(productId);
    try {
      const response = await fetch('/api/product/cart', {
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
        navigate('/cart');
      } else {
        setError(json.error || 'Failed to add item to cart.');
      }
    } catch (err) {
      setError('Failed to add item to cart.');
    }
  };
  const updateCart = async (productId, newQuantity) => {
    if (!user) {
      setError('You need to log in to update items in the cart.');
      return;
    }

    try {
      const response = await fetch('/api/product/cart', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ productId, newQuantity }),
      });
      const json = await response.json();

      if (response.ok) {
        setCart(json);
      } else {
        setError(json.error || 'Failed to update cart.');
      }
    } catch (err) {
      setError('Failed to update cart.');
    }
  };

  return { cart, error, fetchCart, addToCart,updateCart };
};
