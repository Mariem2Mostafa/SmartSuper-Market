import './HistoryStyles.css'
import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { useEffect } from 'react';
import useFetch from '../useFetch';


const History = () => {
    const { error, isPending, data } = useFetch('history');
    const {data: products } = useFetch('Products');

    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    data.productId = products.id;

    // useEffect(() => {
    //     setFilteredProducts(data.filter((val) =>
    //         val.product_name.toLowerCase().includes(search.toLowerCase())
    //     ));
    // }, [search, data]);

    const handleSearch = (e) => {
        // e.preventDefault();
        // setSearch(e.target.value);
    };


    return (
        
        <div className="history">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            <div>
                <div className="inputSearch">
                    <form onSubmit={handleSearch}>
                        <input type='text' placeholder='Search'
                            onChange={(e) => setSearch(e.target.value)}></input>
                        <button type='submit'><IoSearch/></button>
                    </form>
                
                </div>
                

                <div className="Table">
                    <table>
                        {/* Groups the header content in a table */}
                        <thead>
                            {/* Defines a header cell in a table */}
                            <th>Product Name</th>
                            <th>Order Date</th>
                            <th>Order ID</th>
                            <th>Product ID</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            
                        </thead>
                        {/* Groups the body content in a table */}
                        <tbody>

                            <tr>

                            </tr>
                        </tbody>
                    </table>
                    
                </div>

                <div className="data">
                </div>
            </div>
            
            
    </div>
    )
}

export default History
