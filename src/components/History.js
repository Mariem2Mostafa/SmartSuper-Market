import React, { useState } from 'react'
import './StylesPages.css'
import { IoSearch } from "react-icons/io5";


const History = () => {
    const [search, setSearch] = useState("");

    const handleSearch = () => {
        console.log("Search..")
    }
    return (
        
        <div className="history">
            <div>
                <div className="inputSearch">
                    <form onSubmit={handleSearch}>
                        <input type='text' placeholder='Search'
                            onChange={(e) => setSearch(e.target.value)}></input>
                        <button><IoSearch/></button>
                    </form>
                
            </div>

                <div className="data">
                </div>
            </div>
            
            
    </div>
    )
}

export default History
