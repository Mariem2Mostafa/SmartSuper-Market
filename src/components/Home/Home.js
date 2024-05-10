import './HomeStyles.css'
import React from 'react';
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useState } from 'react';
import { useEffect } from 'react';
import FetchDailyOrders from '../FetchDailyOrders';

const Home = () => {
    const { error, isPending, data: products } = useFetch('Products');
    const {orders ,calculateTotalPrice,data} = FetchDailyOrders()
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    

    

    // search
    useEffect(() => {
        setFilteredProducts(products.filter((product) =>
            product.product_name.toLowerCase().includes(search.toLowerCase())
        ));
    }, [search, products]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="home" >
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {/* sec1 */}
            <section className="welcomimg" id='welcome'>
                <div className='caption'>
                    <h1>The Produce is fresh,</h1> 
                    <h1>chemical free</h1>
                    <h1>&</h1>
                    <h1>of high quality</h1>
                </div>
            </section>

            {/* sec2 */}
            <section id='products' >
                <div className="text">Products</div>
                <div className="search">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={handleSearch}
                        /><button><IoSearch/></button>
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
            </section>

            {/* sec3 */}
            <section id='Data'>
                <div>
                    <div className="text">Sales database</div>
                <div>
                    {data && data.length > 0 && (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th style={{textAlign:"center"}}>Date</th>
                                    <th style={{textAlign:"center"}}>Product ID</th>
                                    <th style={{textAlign:"center"}}>Product Name</th>
                                    <th style={{textAlign:"center"}}>Price</th>
                                    <th style={{textAlign:"center"}}>Quantity</th>
                                    <th style={{textAlign:"center"}}>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((day) => (
                                    orders[day.id] && Object.values(orders[day.id]).map(order => (
                                        order.productId && (
                                            <tr key={order.productId}>
                                                <td style={{textAlign:"center"}}>{day.id}</td>
                                                <td style={{textAlign:"center"}}>{order.productId}</td>
                                                <td style={{textAlign:"center"}}>{products.find(p => p.id === order.productId)?.product_name}</td>
                                                <td style={{textAlign:"center"}}>{products.find(p => p.id === order.productId)?.price.toFixed(2)} EGP</td>
                                                <td style={{textAlign:"center"}}>{order.quantity}</td>
                                                <td style={{textAlign:"center"}}>{calculateTotalPrice(order, order.quantity, products).toFixed(2)} EGP</td>
                                            </tr>
                                        )
                                    ))
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </section>


        </div>
    );
};

export default Home;



