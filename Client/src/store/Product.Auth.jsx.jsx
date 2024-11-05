import { useContext, createContext,  useState, useEffect } from 'react';
import axios from 'axios';

const ProductAuth = createContext();

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
     const [getAllProducts, setGetAllProducts] = useState([])
     const [fashion, setFashion] = useState([])
     const [Sports, setSports] = useState('')

     const [error, setError] = useState(null)


    
     const createProduct = async (formData) => {
        try {
            const response = await axios.post('http://localhost:4000/api/v1/users/create-admin', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setProducts((prev) => [...prev, response.data]);
            return response.data;
        } catch (err) {
            setError(err.response.data.message);
            console.error(err?.response.data.message);
        }
    };

     useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/products/electronic');
                setGetAllProducts(response.data);
                // console.log("All products", response.data);
                return  response.data
            } catch (error) {
                // console.log("Error while fetching all products");
                setError(error.response.data.message);
            }
        };

        fetchProducts(); 
    }, []);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/products/fashion`);
                setFashion(response.data);
                return response.data;
            } catch (error) {
                setError(error.response.data.message); 
            }
        };

        fetchProduct(); 
    }, []);


    useEffect(()=> {
        const fetchSportsProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/products/Sports`);
                setSports(response.data);
                return response.data;
            } catch (error) {
                setError(error.response.data.message);
            }
        };
        fetchSportsProducts();
    },[])



    return (
        <ProductAuth.Provider value={{ createProduct, products, error, getAllProducts, fashion, Sports}}>
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
