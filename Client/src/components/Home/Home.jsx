import { Logout } from '../Logout/Logout.jsx'
import { useAuth } from '../../store/AuthStore.jsx'
import Product from "../Products/Products.jsx"

const Home = () => {  
  const { user } = useAuth();

  console.log("user", user);
  


  return (
    <div>
      <header>
        <Logout />
      </header>
        <section>
          <Product/>
        </section>
        <h1>Welcome, {user.data.loggedInUser.username}!</h1>
    </div>
  );
}

export default Home;
