import React, { useState } from 'react';

const CartItem = ({ name, price, imageUrl, quantity, onUpdateQuantity }) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const handleIncrease = () => {
    const newQuantity = currentQuantity + 1;
    setCurrentQuantity(newQuantity);
    onUpdateQuantity(newQuantity);
  };

  const handleDecrease = () => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setCurrentQuantity(newQuantity);
      onUpdateQuantity(newQuantity);
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setCurrentQuantity(newQuantity);
      onUpdateQuantity(newQuantity);
    }
  };

  return (
    <div className="col-md-2 d-flex align-items-stretch my-4">
      <div className="card h-100">
        <img src={imageUrl} alt={name} className="img-fluid mx-auto card-img-top" style={{ height: '200px', objectFit: 'contain' }} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">${price.toFixed(2)}</p>
          <label>Quantity:</label>
          <div className="input-group">
            <input
              type="number"
              className="form-control text-center"
              value={currentQuantity}
              onChange={handleQuantityChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
