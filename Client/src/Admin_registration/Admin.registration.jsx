import { ClimbingBoxLoader } from "react-spinners";
import { useState } from "react";
import { useAdminAuth } from "../store/AdminRoute";

const AdminRegister = () => {
    const { adminRegistrations, error } = useAdminAuth();

    const [formsData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        
         const data= await adminRegistrations(formsData.username, formsData.email, formsData.password);
        //  console.log('data received', data)
        setLoading(false)

        if (data && data.success) {
          toast.success(data.message || "User Registered Successfully");
          navigate("/login");
        }

        setLoading(false);
        setFormData({
            username: "",
            email: "",
            password: ""
        });
    };

    return (
        <div className="register_Wrapper">
            <h1 className="register_Title">Register</h1>
            <form onSubmit={submitHandler}>
                <div className="register_Content">
                    <input
                        type="text"
                        placeholder="User Name"
                        name="username"
                        className="register_Input"
                        value={formsData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        className="register_Input"
                        placeholder="Email"
                        name="email"
                        value={formsData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        className="register_Input"
                        placeholder="Password"
                        name="password"
                        value={formsData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="register_Button" type="submit">
                    Register
                </button>
            </form>
            {loading && (
                <div className="loader-container">
                    <ClimbingBoxLoader color="#36d7b7" size={15} />
                    <p className="registering-text">Registering...</p>
                </div>
            )}
            {error && <p className="errorMessage">{error}</p>}
            <p className="register_Para"></p>
        </div>
    );
};

export default AdminRegister;
