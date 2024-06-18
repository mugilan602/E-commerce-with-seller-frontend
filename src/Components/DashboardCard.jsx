
const DashboardCard = ({ id, name, price, imageUrl, category }) => {
    const handleClick = () => {
        window.location.href = `/seller/product/${id}/customers`;
    };
    return(
        <div className="col-md-3 d-flex align-items-stretch my-4">
        <div className="card h-100">
            <img src={imageUrl} alt={name} className="card-img-top img-fluid" style={{ height: '220px', objectFit: 'contain',width:'225px' }} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">${price}</p>
                <div className="mt-auto d-flex justify-content-center">
                    <button type="button" className="btn btn-dark" onClick={handleClick}>Customers</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default DashboardCard;
