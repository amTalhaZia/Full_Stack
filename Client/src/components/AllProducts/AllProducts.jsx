import { useProductAuth } from "../../store/Product.Auth.jsx";

const AllProducts = () => {
    const { getAllProducts } = useProductAuth();

    return (
        <div className="all-products-wrapper">
            <div className="products-list">
                {getAllProducts.data.map((product) => (
                    <div key={product._id} className="product-card">
                        <img 
                            src={`/public/temp/${product.image}`} 
                            className="product-image" 
                        />
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
