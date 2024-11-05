import { useContext, createContext, useState } from "react";
import axios from "axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const adminRegistrations = async (username, email, password) => {
        try {
            // const formData = new FormData();
            // formData.append("username", username);
            // formData.append("email", email);
            // formData.append("password", password);

            const response = await axios.post(`http://localhost:4000/api/v1/users/create-admin`,
                {username,email, password}
            );

            return  response.data
        } catch (error) {
            // console.error("Error registering admin:", error);
            setError(error?.response?.data?.message);
        }
    };

    return (
        <AdminContext.Provider value={{ adminRegistrations, error }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminAuth = () => {
    const context = useContext(AdminContext);

    if (!context) {
        throw new Error("Please wrap your component with AdminProvider.");
    }

    return context;
};
