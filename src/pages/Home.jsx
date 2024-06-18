import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import ProductCard from '../Components/ProductCard';
import { useProductContext } from '../hooks/useProductContext';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const { products, dispatch } = useProductContext();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await fetch("/api/product/latest");
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_PRODUCTS", payload: json });
        } else {
          console.error('Failed to fetch latest products:', json);
        }
      } catch (error) {
        console.error('Error fetching latest products:', error);
      }
    };

    fetchLatestProducts();
  }, [dispatch]);

  return (
    <div>
      <header>
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand text-white">
              <h1 className="display-6">KOOL</h1>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link text-white" to="/category/mens">Mens</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/category/womens">Womens</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/category/beauty">Beauty</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/category/sport">Sport</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/category/child">Child</Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link text-white" to="/category/special">Special</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/category/brands">Brands</Link>
                </li> */}
                <li className="nav-item">
                  {user ? (
                    <>
                      <span className="my-5 text-white ml-3 mr-3">{user.email}</span>
                      <Link className="btn btn-outline-light" to="/cart" >Cart</Link>
                      <button className="btn btn-outline-light" onClick={handleClick}>Logout</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="btn btn-outline-light">Login</Link>
                      <Link to="/signup" className="btn btn-outline-light">Signup</Link>
                    </>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero-section text-center py-5">
        <div className="container d-flex">
          <div className="text-with-button col-6">
            <h2 className="text-white text-start">Buy Best Products <br /> From All Of The World</h2>
            <p className="text-white text-start">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
          </div>
          <div className="col-6">
            <img className="hero-img" src="https://res.cloudinary.com/sharp-consumer-eu/image/fetch/w_1100,f_auto,q_auto/https://s3.infra.brandquad.io/accounts-media/SHRP/DAM/origin/e9601a9c-b16f-11ea-b758-26771c4dcb1c.jpg" alt="Special Products" />
            <p className="text-white">Offer Zone</p>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <h3 className="text-center mb-4">Newest Products</h3>
        <div className="row">
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                imageUrl={product.image_url}
                category={product.category}
              />
            ))
          ) : (
            <p className="text-center">No latest products found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
