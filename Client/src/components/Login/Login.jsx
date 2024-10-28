import { useEffect, useState } from "react";
import { useAuth } from "../../store/AuthStore";
import "./login.css";

const Login = () => {
    const { login } = useAuth();
    const [from, setFrom] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFrom((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const [debounce, setDebounce] = useState(from);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounce(from);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [from]);


    const submitHandler = (e) => {
        e.preventDefault();
        login(debounce.username, debounce.password);
    };

    // error checking
    // if (error) {
    //     return <p>Error: {error}</p>;
    // }

    return (
        <div className="login_Wrapper">
            <h1 className="login_title">Login</h1>
            <form onSubmit={submitHandler}>
                <div className="login_Content">
                    <input
                        type="text"
                        placeholder="User Name"
                        name="username"
                        value={from.username}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={from.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="login_button">Login</button>
            </form>
            <p className="login_para">Don’t have an account? <a href="/register">Register here</a></p>
        </div>
    );
};

export default Login;
