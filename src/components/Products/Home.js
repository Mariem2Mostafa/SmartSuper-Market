import '../StylesPages.css'
import useFetch from "../useFetch";
import { Link } from "react-router-dom";



const Home = () => {
            const { error, isPending, productsList: products } = useFetch('Products');

    return (
        <div className="home">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            <div className="text">Products</div>
            <div className="products-container">
                {products.map((product) => (
                
                <div className="Product" key={product.id}> 
                    <Link className="product-view" to={`/Home/${product.id}/${product.product_name}`}>
                    <div className="product-img">
                    <img src={product.url} alt="product-img" />
                    </div>
                    <h1 className="product-name">{product.product_name}</h1>
                    <span className="product-price">{product.price} EGP</span>
                    </Link>
                    
                </div>
            ))}
        </div>
        </div>
    )

}

export default Home;

