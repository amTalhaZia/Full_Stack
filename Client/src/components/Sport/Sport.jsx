import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Sport.css';
import { ClimbingBoxLoader } from "react-spinners";


const Sport = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/products/Sports`);
                setProduct(response.data.data.find((item) => item._id === id));
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error fetching data");
            }
        };

        fetchData();
    }, []);

    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="product-container">
            {product ? (
                <div className="product-card">
                    <img className="product-image" src={product.image[0]} alt={product.name} />
                    <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-title">{product.description}</p>
                    </div>
                </div>
            ) : (
                <ClimbingBoxLoader color="#36d7b7" size={15} />
            )}
        </div>
    );
};

export default Sport;
