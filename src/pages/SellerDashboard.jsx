import React, { useEffect, useState } from 'react';
import { useSellerLogout } from '../hooks/useSellerLogout';
import { useNavigate } from "react-router-dom";
import DashboardCard from '../Components/DashboardCard';

const SellerDashboard = () => {
  const seller=JSON.parse(localStorage.getItem('seller'))
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const { logout } = useSellerLogout();

  const handleLogout = () => {
    logout();
  };
  const addProduct = () => {
    navigate("/seller/create");

  };
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/seller/getProducts', {
          headers: {
            Authorization: `Bearer ${seller.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          setProducts(json);
        } else {
          setError('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching latest products:', error);
        setError('Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [seller.token]);

  return (
    <div>
      <section className="container py-5">
       
        <div className="d-flex justify-content-end mb-3">
        <span className='mx-4 my-2'>{seller.email}</span>
          <button className="btn btn-primary me-2" onClick={addProduct}>
            Add product
          </button>
          <button className="btn btn-outline-danger me-2" onClick={handleLogout}>
            Logout
          </button>

        </div>
        <h3 className="text-center mb-4">My Products</h3>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-3">
            {products.length > 0 ? (
              products.map((product) => (
                <DashboardCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.image_url}
                  category={product.category}
                />
              ))
            ) : (
              <p className="text-center">No products found.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default SellerDashboard;
