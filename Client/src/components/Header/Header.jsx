import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faSearch } from '@fortawesome/free-solid-svg-icons';
import './header.css';
import { useAuth } from "../../store/AuthStore";
import Logout from "../Logout/Logout.jsx";

const Header = () => {
    const { user } = useAuth();

    return (
        <div className="header-container">
            <div className="logo-section">
                <FontAwesomeIcon className='store-icon' icon={faStore} />
                <h1 className='title'>Shopping Cart</h1>
            </div>
            <div className="search-section">
                <input type="text" className='search-input' placeholder="Search..." />
                <FontAwesomeIcon className='search-icon' icon={faSearch} />
            </div>
            <div className="dropdown-container">
                <select className='dropdown' name="product" id="product">
                    <option>Fashion</option>
                    <option>Home</option>
                    <option>Beauty</option>
                    <option>Sports</option>
                    <option>Electronics</option>
                </select>
            </div>
            <div className='user-section'>
                <Logout />
                <div className='username-container'>
                    <p className='username'>{user?.data?.loggedInUser?.username || 'Guest'}</p>
                </div> 
            </div>
        </div>
    );
}

export default Header;
