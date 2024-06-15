import React, { useState } from 'react';

const CartItem = ({ name, price, imageUrl, quantity, onUpdateQuantity }) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value);
    setCurrentQuantity(newQuantity);
    onUpdateQuantity(newQuantity);
  };

  return (
    <div className="col-md-3 p-1 d-flex align-items-stretch">
      <div className="card h-100">
        <img src={imageUrl} alt={name} className="img-fluid mx-auto card-img-top" style={{ height: '200px', objectFit: 'contain' }} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">${price}</p>
          <label>Quantity:</label>
          <select
            className="form-select"
            id="quantity"
            value={currentQuantity}
            onChange={handleQuantityChange}
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
