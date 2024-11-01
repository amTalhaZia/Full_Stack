import { useAuth } from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";
import './logout.css'; 

const Logout = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/login");
  }

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  )
}

export default Logout;
