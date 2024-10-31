import { useContext, createContext,  useState, useEffect } from 'react';
import axios from 'axios';

const ProductAuth = createContext();

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
     const [getAllProducts, setGetAllProducts] = useState([])
     const [error, setError] = useState(null)


    
     const createProduct = async (formData) => {
        try {
            const response = await axios.post('http://localhost:4000/api/v1/products/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setProducts((prev) => [...prev, response.data]);
            return response.data;
        } catch (err) {
            setError(err.response.data.message);
            console.error(err);
        }
    };

     useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/products/allproducts');
                setGetAllProducts(response.data);
                console.log("All products", response.data);
                return  response.data
            } catch (error) {
                console.log("Error while fetching all products");
                setError(error.message);
            }
        };

        fetchProducts(); 
    }, []);


    return (
        <ProductAuth.Provider value={{ createProduct, products, error, getAllProducts}}>
            {children}
        </ProductAuth.Provider>
    );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useProductAuth = () => {
    const context = useContext(ProductAuth);

    if (!context) {
        throw new Error("Please provide a Wrapper for ProductAuth");
    }

    return context;
};
