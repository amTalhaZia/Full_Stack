import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faSearch } from '@fortawesome/free-solid-svg-icons';
import './header.css';
import Logout from "../Logout/Logout.jsx";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthStore.jsx';
const Header = () => {
    const navigate = useNavigate();
    const [select, setSelect] = useState('');
    const { user } = useAuth()
    // console.log('Admin', user)


    const handleChange = (e) => {
        const value = e.target.value;
        setSelect(value);

        switch (value) {
            case 'beauty':
                navigate("./beautyproduct");
                break;
            case 'electronic':
                navigate("./electronicproduct");
                break;
            case 'sport':
                navigate("./sportproduct");
                break;
            case 'fashion':
                navigate("./fashionproduct");
                break;
        }
    };

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
                <select className='dropdown' name="product" value={select} onChange={handleChange} id="product">
                    <option value='home'>Home</option>
                    <option value='fashion'>Fashion</option>
                    <option value='beauty'>Beauty</option>
                    <option value='sport'>Sports</option>
                    <option value='electronic'>Electronics</option>
                </select>
            </div>

            <div className='user-section'>
                {
                    user?.data?.loggedInUser?.role === "admin" && (
                        <div className='admin-section'>
                            <Link to='/create-products'>Admin Dashboard</Link>
                        </div>
                    )
                }
                <Logout />
                <div className='username-container'>
                    <p className='username'>{user?.data?.loggedInUser?.username}</p>
                </div>
            </div>
        </div>
    );
}

export default Header;
