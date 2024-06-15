import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCard from '../Components/ProductCard';

function Category() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/product?category=${categoryName}`);
        const json = await response.json();
        if (response.ok) {
          setProducts(json);
        } else {
          console.error('Failed to fetch category products:', json);
        }
      } catch (error) {
        console.error('Error fetching category products:', error);
      }
      setLoading(false);
    };

    fetchCategoryProducts();
  }, [categoryName]); // Dependency array includes only categoryName

  return (
    <div className="container py-5">
      <h3 className="text-center mb-4">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Products</h3>
      <div className="row">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              imageUrl={product.image_url}
            />
          ))
        ) : (
          <p className="text-center">No products found for {categoryName}.</p>
        )}
      </div>
    </div>
  );
}

export default Category;
