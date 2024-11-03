import { useEffect, useState } from "react";
import { useAuth } from "../../store/AuthStore";
import { toast } from "react-toastify";
import "./login.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const { loginUser, error, setError } = useAuth();
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
        setError(null); 
    };

    const [debounce, setDebounce] = useState(form);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounce(form);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [form]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const data = await loginUser(debounce.username, debounce.password);
        console.log("data", data); // Log the data
    
  
            if (data.success) {
                toast.success(data.message || "Logged in successfully!");
                navigate('/'); 
            } 
    };
    

    return (
        <div className="login_Wrapper">
            <h1 className="login_title">Login</h1>
            <form onSubmit={submitHandler}>
                <div className="login_Content">
                    <input
                        type="text"
                        placeholder="User Name"
                        name="username"
                        className="login_Input"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="login_Input"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="login_button">Login</button>
            </form>
            {error && <p className="errorMessage">{error.message}</p>} 
            <p className="login_para">
                Don’t have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
};

export default Login;
