// import { useAuth } from "../../store/AuthStore.jsx";
// import Product from "../Products/Products.jsx"
import AllProducts from "../AllProducts/AllProducts.jsx";
import HeroSection from "../HeroSection/HeroSection.jsx";
import Header from "../Header/Header.jsx";

const Home = () => {
  // const { user } = useAuth();

  // console.log("user", user);

  return (
    <div>
      <header>
        {/* <Logout /> */}
        <Header />
        <HeroSection />
      </header>
      <section>
        {/* <Product/> */}
        <AllProducts />
      </section>
    </div>
  );
};

export default Home;
