import { useState, useEffect } from "react";
import axios from 'axios';

const FashionProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:4000/api/v1/products/fashion');
                setProducts(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error fetching products");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div className="beauty-items-container">
            {products.length > 0 ? (
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product._id} className="item-card">
                            <img src={product.image[0]} alt={product.name} className="item-image" />
                            <h3 className="item-name">{product.name}</h3>
                            <p className="item-description">{product.description}</p>
                            <p className="item-price">${product.price}</p>
                            <a className="anchor-tags" href={`./fashion/${product._id}`}>more</a>
                        </div>
                    ))}
                </div>
            ) : (
                <h2>No products available</h2>
            )}
        </div>
    );
};

export default FashionProduct;
