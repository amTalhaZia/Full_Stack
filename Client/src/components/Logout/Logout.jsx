import { useAuth } from "../../store/AuthStore";


const Logout = () => {
    const {Logout, user} =  useAuth()

    const handleLogout = () => {
        Logout()
    }
    
    return (
        <div>
          {
            user && (
              <button onClick={handleLogout}>Logout</button>
            )
          }
        </div>
    )
}

export {Logout}