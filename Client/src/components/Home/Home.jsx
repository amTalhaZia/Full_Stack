// import { useAuth } from "../../store/AuthStore.jsx";
// import Product from "../Products/Products.jsx"
import AllProducts from "../AllProducts/AllProducts.jsx";
import HeroSection from "../HeroSection/HeroSection.jsx";
import Header from "../Header/Header.jsx";
// import { useAdminAuth } from "../../store/AdminRoute.jsx";

const Home = () => {
  // const { user } = useAuth();

  // console.log("user", user);

  // const {user} =  useAdminAuth()

  return (
    <div>
      <header>
        {/* <Logout /> */}
        <Header />
        <HeroSection />
      </header>
      <section>
        
        <AllProducts />
      </section>
    </div>
  );
};

export default Home;
