import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./showAll.css";

const ShowAll = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get('http://localhost:4000/api/v1/products/allproducts');
                setData(response.data.data);
            } catch (error) {
                setError(error.response?.data?.message || 'Error fetching data');
                console.error("Error getting data:", error);
            }
        };

        fetchData();
    });

    const handleDelete = async(id) => {
        try {
            await axios.delete(`http://localhost:4000/api/v1/products/delete/${id}`);
            setData(prevData => prevData.filter(product => product._id !== id)); 
        } catch (error) {
            setError(error.response.data.message);
            console.error(error.response.data.message);
        }
    };

    return (
        <div className='product-list-container'>
            {error && <div className='error-message'>{error}</div>}
            {
                data.length > 0 ? (
                    data.map((product) => (
                        <div key={product._id} className='product-item'>
                            <img src={product.image} alt={product.name} className='product-image' />
                            <p className='product-name'>{product.name}</p>
                            <p className='product-description'>{product.description}</p>
                            <p className='product-price'>${product.price}</p>
                            <button className='delete-btn' onClick={() => { handleDelete(product._id) }}>Delete</button>
                        </div>
                    ))
                ) : (
                    <div className='no-data-message'>No products available.</div>
                )
            }
        </div>
    );
};

export default ShowAll;
