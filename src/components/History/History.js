

import './HistoryStyles.css';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Swal from 'sweetalert2';
import { collection, deleteDoc, getDocs } from 'firebase/firestore';
import { IoIosSearch } from 'react-icons/io';
import { MdDelete } from "react-icons/md";
import { FcViewDetails } from "react-icons/fc";
import useFetchOrder from './useFeatchOrder';
import OrderDetails from './OrderDetails/OrderDetails';

const History = () => {
    const {orders, isPending, error} =useFetchOrder()
    const [orderDetailsId, setOrderDetailsId] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);


    useEffect(() => {
        setFilteredOrders(orders.filter((val) =>
            val.orderId.toLowerCase().includes(search.toLowerCase())
        ));
    }, [search, orders]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleDelete = async (orderId) => {
    try {
        const confirmBox = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this order!',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            reverseButtons: true
        });

        if (confirmBox.isConfirmed) {
            const historyRef = collection(db, 'history');
            const querySnapshot = await getDocs(historyRef);
            querySnapshot.forEach(async (doc) => {
                const ordersRef = collection(doc.ref, 'orders');
                const orderQuerySnapshot = await getDocs(ordersRef);
                orderQuerySnapshot.forEach(async (orderDoc) => {
                    if (orderDoc.data().orderId === orderId) {
                        await deleteDoc(orderDoc.ref);
                    }
                });
            });
            setFilteredOrders(filteredOrders.filter(order => order.id !== orderId));
            Swal.fire('Deleted!',
                'Your order has been deleted.', 'success');
        }
    } catch (error) {
        console.error('Error deleting order:', error);
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
                            <button type='submit'><IoIosSearch/></button>
                        </form>
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
                                <td style={{textAlign:"center"}}>{order.id}</td>
                                <td style={{ textAlign: "center" }}> {order.date}</td>
                                <td style={{ textAlign: "center" }}>
                                <button className="view" onClick={() => setOrderDetailsId(order.id)}><FcViewDetails /></button>
                                <button className='delete' onClick={() => handleDelete(order.id)}><MdDelete /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            
            {orderDetailsId && <OrderDetails orderId={orderDetailsId} setOrderDetailsId={setOrderDetailsId} />}
        </div>
        </div>
    );
};

export default History;


