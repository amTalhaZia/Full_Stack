/* eslint-disable react/prop-types */
import { useContext, createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const loginUser = async (username, password) => {
    try {
        const response = await axios.post("http://localhost:4000/api/v1/users/login", { username, password });

        // console.log("Full API Response:", response.data);
        const { accessToken } = response.data.data;
        // console.log("Access Token:", accessToken);
        localStorage.setItem('accessToken', accessToken);
        setUser(response.data);

        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        setError(error.response?.data);
    }
};



  const registerUser = async (avatar, username, email, password) => {
    try {
      // console.log("Registering user with data:", { avatar, username, email, password });

      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(`http://localhost:4000/api/v1/users/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // console.log("Received data:", response.data);
      setUser(response.data);
      return response.data;
    } catch (error) {
      // console.log("Error:", error);
      setError(error.response?.data );
      return undefined;
    }
  };






  const logOut = async () => {
    // console.log("Logging out...");
    try {
        const response = await axios.post("http://localhost:4000/api/v1/users/logout");
        // console.log("Logout API response:", response); 
        return response
    } catch (error) {
        console.error("Error during logout:", error);
    } finally {
        setUser(null);
        localStorage.removeItem('accessToken'); 
    }
};


  return (
    <AuthContext.Provider value={{ user, error, loginUser, registerUser, logOut, setError }}>
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
