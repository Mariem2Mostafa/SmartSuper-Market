import { Link } from "react-router-dom";
import './NotFoStyles.css'
const NotFound = () => {
    return (  
        <div className="not-found">
        <h2>Sorry</h2>
        <p>That page cannot be found</p>
        <Link to="/SmartSuper-Market/Home">Back to the homepage...</Link>
        </div>
    );
}

export default NotFound;