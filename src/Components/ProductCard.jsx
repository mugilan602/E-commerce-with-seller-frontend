import React from 'react';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ id, name, price, imageUrl, category }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const item = { productId: id };
        addToCart(item);
    };

    return (
        <div className="col-md-3 d-flex align-items-stretch">
            <div className="card h-100">
                <img src={imageUrl} alt={name} className="card-img-top img-fluid" style={{ height: '220px', objectFit: 'contain' }} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">${price}</p>
                    <div className="mt-auto d-flex justify-content-center">
                        <button className="btn btn-warning mr-2" onClick={handleAddToCart}>Add to Cart</button>
                        <button type="button" className="btn btn-dark">Buy now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
