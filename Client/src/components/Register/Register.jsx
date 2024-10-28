import { useEffect, useState } from "react";
import { useAuth } from "../../store/AuthStore";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const { registerUser, error } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
  });


  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const [debounceData, setDebounceData] = useState(formData);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceData(formData);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [formData]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await registerUser(
      debounceData.avatar,
      debounceData.username,
      debounceData.email,
      debounceData.password
    );
    console.log("data:", data);
    navigate("/login");
  };

  

  if (error) {
    return <p>Error: {error.message}</p>;
}


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
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            className="register_Input"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            className="register_Input"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="file"
            name="avatar"
            className="register_Input"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <button className="register_Button" type="submit">
          Register
        </button>
      </form>
      <p className="register_Para">
        {" "}
        Already have an account? <a href="/login">Login here</a>
      </p>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
