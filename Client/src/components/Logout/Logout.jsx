import { useAuth } from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";


const Logout = () => {
  const { logOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    console.log(logOut)

    navigate("/login")
  }

  return (
    <div>
          <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export { Logout }