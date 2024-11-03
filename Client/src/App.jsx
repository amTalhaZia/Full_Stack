import { Routes, Route } from "react-router-dom"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.jsx"
import Home from "./components/Home/Home.jsx"
import { ToastContainer } from "react-toastify";
import Fashion   from "../src/components/Fashion/Fashion.jsx"
import Sport from "../src/components/Sport/Sport.jsx"
import  Electronic   from  "../src/components/Electronic/Electronic.jsx"
import BeautyProduct from "./components/Category/BeautyProduct/BeautyProduct.jsx"
import SportProduct from "./components/Category/SportProduct/SportProduct.jsx"
import ElectronicProduct from "./components/Category/ElectronicProduct/ElectronicProduct.jsx"
import FashionProduct from "./components/Category/FashionProduct/FashionProduct.jsx"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route  path="/fashion/:id"  element={<Fashion/>} />
        <Route  path="/sport/:id"  element={<Sport/>} />
        <Route  path="/electronic/:id"  element={<Electronic/>} />
        <Route  path="/beautyproduct"  element={<BeautyProduct/>} />
        <Route  path="/Sportproduct"  element={<SportProduct/>} />
        <Route  path="/electronicproduct"  element={<ElectronicProduct/>} />
        <Route  path="/fashionproduct"  element={<FashionProduct/>} />





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
