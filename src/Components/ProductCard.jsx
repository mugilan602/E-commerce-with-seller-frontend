import React from 'react';
import { useCart } from '../hooks/useCart';
import { useBuy } from '../hooks/useBuy';
const ProductCard = ({ id, name, price, imageUrl, category }) => {
    const { addToCart } = useCart();
    const { buy, error } = useBuy();
    const handleBuyClick = () => {
        const item= {productId:id}
        buy(item);
      };
    
    const handleAddToCart = () => {
        const item = { productId: id };
        addToCart(item);
    };

    return (
        <div className="col-md-3 col-sm-6 d-flex align-items-stretch my-4">
            <div className="card h-100">
                <img src={imageUrl} alt={name} className="card-img-top img-fluid" style={{ height: '220px', objectFit: 'contain',width:'225px' }} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">${price}</p>
                    <div className="mt-auto d-flex justify-content-center">
                        <button className="btn btn-warning mr-2" onClick={handleAddToCart}>Add to Cart</button>
                        <button type="button" className="btn btn-dark" onClick={handleBuyClick}>Buy now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
