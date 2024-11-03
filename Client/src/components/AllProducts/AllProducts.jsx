import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useProductAuth } from "../../store/Product.Auth.jsx";
import "./AllProducts.css";

const AllProducts = () => {
    const { getAllProducts, fashion, Sports } = useProductAuth();

    return (
        <div className="all-products-wrapper">
            <div className="products-category">
                <h1 className="products-heading">Electronics</h1>
                <div className="products-list">
                    {getAllProducts.data.map((product) => (
                        <Link to={`/electronic/${product._id}`} key={product._id} className="product-card"> 
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="product-image" 
                            />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">${product.price}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Fashion */}
            <div className="products-category">
                <h1 className="products-heading">Fashion</h1>
                <div className="products-list">
                    {fashion.data.map((product) => (
                        <Link to={`/fashion/${product._id}`} key={product._id} className="product-card"> 
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="product-image" 
                            />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">${product.price}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Sports */}
            <div className="products-category">
                <h1 className="products-heading">Sport</h1>
                <div className="products-list">
                    {Sports.data.map((product) => (
                        <Link to={`/sport/${product._id}`} key={product._id} className="product-card">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="product-image" 
                            />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">${product.price}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
