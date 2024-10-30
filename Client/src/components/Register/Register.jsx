import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAuth } from "../../store/AuthStore";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser, error, setError } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [laoding, setLaoding] = useState(false)

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
    setError(null); 
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
    setLaoding(true)
    e.preventDefault();
    const data = await registerUser(
      debounceData.avatar,
      debounceData.username,
      debounceData.email,
      debounceData.password
    );
    console.log("Register:", data);
    
     setLaoding(false)
    if (data && data.success) {
      toast.success(data.message || "User Registered Successfully");
      navigate("/login");
    }
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
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            className="register_Input"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            className="register_Input"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
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
        <button className="register_Button" type="submit" >
           Register
        </button>
      </form>
      {laoding && (
        <div className="loader-container">
          <ClimbingBoxLoader color="#36d7b7" size={15} />
          <p className="registering-tex" >Regestring........</p>
        </div>
      )}
      {error && <p className="errorMessage">{error.message}</p>} 
      <p className="register_Para">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
