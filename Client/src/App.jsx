import { Routes, Route } from "react-router-dom"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.jsx"
import Home from "./components/Home/Home.jsx"
import { ToastContainer } from "react-toastify";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
