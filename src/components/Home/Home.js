import './HomeStyles.css'
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useState } from 'react';
import { useEffect } from 'react';



const Home = () => {
    const { error, isPending, data: products } = useFetch('Products');
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        setFilteredProducts(products.filter((product) =>
            product.product_name.toLowerCase().includes(search.toLowerCase())
        ));
    }, [search, products]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            <div className="text">Products</div>
            <div className="search">
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearch}
                    />
                    <button><IoSearch/></button>
                </form>
            </div>
            <div className="products-container">
                {filteredProducts.map((product) => (
                    <div className="Product" key={product.id}>
                        <Link className="product-view" to={`/SmartSuper-Market/Home/${product.id}/`}>
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
    );
};


export default Home;

