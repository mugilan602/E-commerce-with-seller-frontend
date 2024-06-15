import React, { useState } from 'react';
import { useProductContext } from '../hooks/useProductContext';
import { useSellerAuthContext } from '../hooks/useSellerAuthContext';
const Create= ()=> {
    const {seller}=useSellerAuthContext();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image_url, setImage_url] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { dispatch } = useProductContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const product = { name, price, image_url, category };
        const response = await fetch("/api/seller/create", {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${seller.token}`
            }
        });
        const json = await response.json();
        console.log(json);
        if (!response.ok) {
            setError(json.error);
            setSuccess("");
        } else {
            setError("");
            setSuccess("Product successfully added!");
            setName("");
            setPrice("");
            setImage_url("");
            setCategory("");
            dispatch({ type: "CREATE_PRODUCTS", payload: json });
        }
    };


    return (
        <div className="container mt-5">
            <h2>Product Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter product name"
                        onChange={(e) => { setName(e.target.value) }}
                        value={name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="Enter product price"
                        onChange={(e) => { setPrice(e.target.value) }}
                        value={price}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image-url">Image URL</label>
                    <input
                        type="url"
                        className="form-control"
                        id="image-url"
                        placeholder="Enter image URL"
                        onChange={(e) => { setImage_url(e.target.value) }}
                        value={image_url}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        className="form-control"
                        id="category"
                        onChange={(e) => { setCategory(e.target.value) }}
                        value={category}
                    >
                        <option value="">Select a category</option>
                        <option value="mens">Mens</option>
                        <option value="womens">Womens</option>
                        <option value="beauty">Beauty</option>
                        <option value="sport">Sport</option>
                        <option value="child">Child</option>
                        <option value="special">Special</option>
                        <option value="brands">Brands</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
    );
}

export default Create;
