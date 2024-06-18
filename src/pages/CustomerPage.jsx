import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CustomersPage = () => {
    const seller = JSON.parse(localStorage.getItem('seller'));
    const { productId } = useParams();
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/seller/product/${productId}/customers`, {
                    headers: {
                        Authorization: `Bearer ${seller.token}`, // Using seller's token for authentication
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setCustomers(data); // Update customers state with fetched data
                } else {
                    setError('Failed to fetch customers');
                }
            } catch (error) {
                console.error('Error fetching customers:', error);
                setError('Failed to fetch customers');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCustomers();
    }, [productId, seller.token]); // Dependencies include productId and seller's token

    return (
        <div className="container py-5">
            <h3 className="text-center mb-4">Customers for Product</h3>
            {isLoading ? (
                <p className="text-center">Loading...</p>
            ) : error ? (
                <p className="text-center text-danger">{error}</p>
            ) : customers.length > 0 ? (
                <ul>
                    {customers.map((customer) => (
                        <li key={customer._id}>{customer.email}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">No customers found.</p>
            )}
        </div>
    );
};

export default CustomersPage;
