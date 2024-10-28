/* eslint-disable react/prop-types */
import { useContext, createContext, useState } from "react";
import { api } from "../utils/Api.utils"; 
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const loginUser = async (username, password) => {
    try {
      const response = await api.post("/login", { username, password });
      setUser(response.data);
    } catch (error) {
      console.log("Error:", error);
      setError(error);
    }
  };



  const registerUser = async (avatar, username, email, password) => {
    try {
      console.log("Registering user with data:", { avatar, username, email, password });
  
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/register",
        { avatar, username, email, password },
        {
          headers: {
            'Content-Type': 'application/json', 
          },
          withCredentials: true, 
        }
      );
  
      console.log("Response:", response.data);
      setUser(response.data);
    } catch (error) {
      console.log("Error:", error);      
      setError(error);
    }
  };
  
  

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ user, error, loginUser, registerUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Please wrap the application in AuthProvider.");
  }

  return context;
};
