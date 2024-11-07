import './NavStyles.css';
import { AiOutlineHome } from "react-icons/ai";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { MdHistory } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { NavLink, useHistory,useLocation } from 'react-router-dom';
import { useState } from 'react';
import { NavHashLink } from 'react-router-hash-link';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const location =useLocation()
    const history = useHistory();
    const handleSignOut = () => {

        history.replace('/SmartSuper-Market'); 
    };

    return (
        <nav className='nav'>
            <NavLink to="/SmartSuper-Market" className="log">
                <img src="https://juniorssupermarket.com/wp-content/uploads/2022/12/Carreta.png" alt="not" />
                <h1>SmartSuperMarket</h1>
            </NavLink>
                {location.pathname === "/SmartSuper-Market" && (
                <div className='homeF'>
                    <NavHashLink to="/SmartSuper-Market#welcome">Home</NavHashLink>
                    <NavHashLink to="/SmartSuper-Market#products">Products</NavHashLink>
                    <NavHashLink to="/SmartSuper-Market#Data">Data</NavHashLink>

                </div>
            )}
    

            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="links">
                <ul className={menuOpen ? "open" : ""}>
                    {location.pathname !== "/SmartSuper-Market" && (
                        <li>
                            <NavLink to="/SmartSuper-Market">
                                <AiOutlineHome/>
                            </NavLink>
                        </li>
                    )}
                    
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















