import { Logout } from '../Logout/Logout.jsx'
import { useAuth } from '../../store/AuthStore.jsx'
import Product from "../Products/Products.jsx"
import AllProducts from '../AllProducts/AllProducts.jsx';

const Home = () => {
  const { user } = useAuth();

  // console.log("user", user);



  return (
    <div>
      <header>
        <Logout />
        <h1>Welcome, {user.data.loggedInUser.username}!</h1>
      </header>
      <section>
        <Product/>
         <AllProducts/>
      </section>
    </div>
  );
}

export default Home;
