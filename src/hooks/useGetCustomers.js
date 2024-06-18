import { useState } from 'react';
import { useSellerAuthContext } from './useSellerAuthContext';
import { useNavigate } from 'react-router-dom';

export const useGetCustomers = () => {
  const [customers, setCustomers] = useState(null);
  const [error, setError] = useState(null);
  const { seller } = useSellerAuthContext();

  // Fetch customers associated with the seller
  const fetchCustomers = async () => {
    if (!seller) {
      setError('You need to log in to view customers.');
      return;
    }

    try {
      const response = await fetch('/api/seller/getCustomers', {
        headers: {
          Authorization: `Bearer ${seller.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setCustomers(json);
      } else {
        setError(json.error || 'Failed to fetch customers.');
      }
    } catch (err) {
      setError('Failed to fetch customers.');
    }
  };

  return { customers, error, fetchCustomers };
};
