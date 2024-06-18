import React from 'react';
import { Link } from 'react-router-dom';
const DashboardCard = ({ id, name, price, imageUrl, category }) => {

    return (
        <div className="col-md-3 d-flex align-items-stretch">
            <div className="card h-100">
                <img src={imageUrl} alt={name} className="card-img-top img-fluid" style={{ height: '220px', objectFit: 'contain' }} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">${price}</p>
                    <div className="mt-auto d-flex justify-content-center">
                        <Link to="/getCustomers">Get Customers</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
