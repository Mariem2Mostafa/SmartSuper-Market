import './HomeStyles.css'
import React from 'react';
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useState } from 'react';
import { useEffect } from 'react';

const Home = () => {
    const { error, isPending, data: products } = useFetch('Products');
    const { data } = useFetch('history');
    
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    //data
    const [addedProducts, setAddedProducts] = useState([]);

    const findProductById = (productId) => {
        return products.find(product => product.id === productId);
    };
    
    useEffect(() => {
        if (data && data.length > 0) {
            const newProducts = [];
            data.forEach(order => {
                if (order.productsId && order.productsId.length > 0) {
                    order.productsId.forEach(product => {
                        const existingProductIndex = newProducts.findIndex(p => p.productId === product.productId);
                        if (existingProductIndex !== -1) {
                            newProducts[existingProductIndex].quantity += product.quantity;
                        } else {
                            const foundProduct = findProductById(product.productId);
                            if (foundProduct) {
                                newProducts.push({ productId: product.productId, quantity: product.quantity ,date: order.date});
                            }
                        }
                    });
                }
            });
            setAddedProducts(newProducts);
        }
    }, [data, products]);

    const calculateTotalPrice = (product, quantity) => {
        const foundProduct = findProductById(product.productId);
        if (!foundProduct) {
            return 0;
        }
        return parseFloat(foundProduct.price) * parseFloat(quantity);
    };
    

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
            </section>

            {/* sec3 */}
            <section id='Data'>
                <div>
                    <div className="text">Sales database</div>
                    {data?.length > 0  ? (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "center" }}>NO.</th>
                                    <th style={{ textAlign: "center" }}>Product ID</th>
                                    <th style={{ textAlign: "center" }}>Product Name</th>
                                    <th style={{ textAlign: "center" }}>Quantity</th>
                                    <th style={{ textAlign: "center" }}>Price</th>
                                    <th style={{ textAlign: "center" }}>Date/Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {addedProducts.map((product, index) => {
                                    const totalPrice = calculateTotalPrice(product, product.quantity);
                                    return (
                                        <tr key={index}>
                                            <td style={{ textAlign: "center" }}>{index +1}</td>
                                            <td style={{ textAlign: "center" }}>{product.productId}</td>
                                            <td style={{ textAlign: "center" }}>{findProductById(product.productId).product_name}</td>
                                            <td style={{ textAlign: "center" }}>{product.quantity}</td>
                                            <td style={{ textAlign: "center" }}>{totalPrice.toFixed(2)} EGP</td>
                                            <td style={{ textAlign: "center" }}>{product.date}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div>No data available</div>
                    )}
                </div>
            </section>


        </div>
    );
};

export default Home;



