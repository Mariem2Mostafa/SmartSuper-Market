import './NavStyles.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    
    const history = useHistory();
    const handleSignOut = () => {

        history.replace('/SmartSuper-Market'); 
    };

    return (
        <nav className='nav'>
            <h1>SmartSuperMarket</h1>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="links">
                <ul className={menuOpen ? "open" : ""}>
                    <li><NavLink to="/SmartSuper-Market/Home">Home</NavLink></li>
                    <li><NavLink to="/SmartSuper-Market/AddProduct">Add Product</NavLink></li>
                    <li><NavLink to="/SmartSuper-Market/History">History</NavLink></li>
                    <li><button onClick={handleSignOut}>Sign Out</button></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
