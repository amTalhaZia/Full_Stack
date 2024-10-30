import { useContext, createContext,  useState } from 'react';
import axios from 'axios';

const ProductAuth = createContext();

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
     const [product, setproduct] = useState('')
     const [error, setError] = useState(null)

     const  createProduct = async (product)=> {
          try {
            const   respone =   await   axios.post("http://localhost:4000/api/v1/products/create",product,)
            setproduct((prev)=>[...prev,  respone])
            return  respone.data
          } catch (error) {
             setError(error.message)
             console.log("Error creating", error)
          }
     }
    return (
        <ProductAuth.Provider value={{ createProduct, product, error}}>
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
