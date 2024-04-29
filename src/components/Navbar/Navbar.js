import './NavStyles.css';
// import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { MdHistory } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
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
            <NavLink to="/SmartSuper-Market/Home" className="log">
                <img src="https://juniorssupermarket.com/wp-content/uploads/2022/12/Carreta.png" alt="not" />
                <h1>SmartSuperMarket</h1>
            </NavLink>
            
            
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="links">
                <ul className={menuOpen ? "open" : ""}>
                    <li><NavLink to="/SmartSuper-Market/Home">
                        <AiOutlineHome/>
                    </NavLink></li>
                    <li><NavLink to="/SmartSuper-Market/AddProduct">
                        <BsDatabaseFillAdd  />
                    </NavLink></li>
                    <li><NavLink to="/SmartSuper-Market/History">
                        <MdHistory/>
                    </NavLink></li>
                    <li><button onClick={handleSignOut}>
                        <IoIosLogOut />
                    </button></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;















