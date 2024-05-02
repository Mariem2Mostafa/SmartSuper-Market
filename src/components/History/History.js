import './HistoryStyles.css'
import React, { useState ,useEffect} from 'react'
import { IoSearch } from "react-icons/io5";
import { FcViewDetails } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import useFetch from '../useFetch';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from "../../firebase";
import Swal from 'sweetalert2';
import OrderDetails from './OrderDetails/OrderDetails';

const History = () => {

    const { error, isPending, data } = useFetch('history');

    const [orderDetailsId, setOrderDetailsId] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);

    
    

    useEffect(() => {
        setFilteredOrders(data.filter((val) =>
            val.id.toLowerCase().includes(search.toLowerCase())
        ));
    }, [search, data]);

    

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };



    const handleDelete = async (id) => {
        try {
            const confirmBox = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this order!',
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33" ,
                reverseButtons: true
            });

        if (confirmBox.isConfirmed) {
                const deleteVal = doc(db, "history", id);
                await deleteDoc(deleteVal);
                setFilteredOrders(filteredOrders.filter(order => order.id !== id));
                Swal.fire('Deleted!', 'Your order has been deleted.', 'success');
                }
        } catch (error) {
            console.error("Error deleting order:", error);
            Swal.fire('Error', 'An error occurred. Please try again.', 'error');
        }
    };
    
    
    return (
        
        <div className="history">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            <div className='orders'  style={{marginTop:"75px",marginBottom:"75px"}}>
                <div className="title"><h1>Orders List</h1></div>
                <div className="inputSearch">
                    <div className='formSearch'> 
                        <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={handleSearch}
                        />
                        <button type='submit'><IoSearch/></button>
                    </form>
                    </div>
                    
                    <div className="clear">
                        <button>clear Data</button>
                    </div>
                </div>
                    <table className='table'>
                    <thead>
                            <tr>
                                <th style={{textAlign:"center"}}>NO.</th>
                                <th style={{textAlign:"center"}}>Order Id</th>
                                <th style={{textAlign:"center"}}>Order Time/Date</th>
                                <th style={{textAlign:"center"}}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order,index) => (
                            <tr key={order.id} className="Order">
                                <td style={{textAlign:"center"}}>{index + 1 }</td>
                                <td style={{textAlign:"center"}}>{order.orderId}</td>
                                <td style={{ textAlign: "center" }}> { order.date}</td>
                                <td style={{textAlign:"center"}}>
                                    <button className="view" onClick={() => setOrderDetailsId(order.id)}><FcViewDetails /></button>
                                    <button className='delete'
                                        onClick={() => { handleDelete(order.id) }}><MdDelete /></button>
                                </td>
                                {orderDetailsId === order.id && <OrderDetails orderId={order.id} setOrderDetailsId={setOrderDetailsId} />}
                            </tr>
                        ))}
                    </tbody>
                
                </table>
            </div>
            
            
    </div>
    )
}
export default History;
