import React, { useEffect, useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuthContext } from '../hooks/useAuthContext';
import CartItem from '../Components/CartItem';

const Cart = () => {
  const { cart, error, fetchCart, updateCart } = useCart(); 
  const { user } = useAuthContext();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  useEffect(() => {
    if (cart && cart.items.length > 0) {
      const total = cart.items.reduce((acc, item) => {
        return acc + item.productId.price * item.quantity;
      }, 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      await updateCart(productId, newQuantity);
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Please log in to view your cart.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Cart</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {cart ? (
        <div className="row">
          {cart.items.length > 0 ? (
            <>
              {cart.items.map((item) => (
                <CartItem
                  key={item.productId._id} 
                  name={item.productId.name}
                  price={item.productId.price}
                  imageUrl={item.productId.image_url}
                  quantity={item.quantity}
                  onUpdateQuantity={(newQuantity) => handleUpdateQuantity(item.productId._id, newQuantity)}
                />
              ))}
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Total Price</h5>
                    <h6 className="card-subtitle mb-2 text-muted">${totalPrice.toFixed(2)}</h6>
                    <button type="button" className="btn btn-primary btn-block">Proceed to Checkout</button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="alert alert-info">Your cart is empty.</div>
          )}
        </div>
      ) : (
        <div className="alert alert-info">Loading cart...</div>
      )}
    </div>
  );
};

export default Cart;