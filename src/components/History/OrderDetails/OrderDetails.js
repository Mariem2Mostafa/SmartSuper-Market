
import './OrderDetailsStyle.css'
import useFetchOrder from '../useFeatchOrder';
import useFetch from '../../useFetch';
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { db } from "../../../firebase";
import { updateDoc, collection, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2'; //confirmBox

const OrderDetails = ({ orderId, setOrderDetailsId }) => {
    const { orders,setOrders, isPending, error } = useFetchOrder()
    const { data: productsData } = useFetch('Products');

    
    const order = orders && orders.find(order => order.id === orderId);

    const findProductById = (productId) => {
        return productsData.find(product => product.id === productId);
    };

    const handleDeleteProduct = async (productId, productQuantity) => {
    try {
        const confirmBox = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this product from order!',
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
                        const updatedProductsId = orderDoc.data().productsId.map(product => {
                            if (product.productId === productId && product.quantity > 1) {
                                return { ...product, quantity: product.quantity - 1 };
                            }
                            return product;
                        });
                        const foundProduct = findProductById(productId);
                        const totalPriceChange = foundProduct.price;
                        const updatedTotalPrice = orderDoc.data().totalPrice - totalPriceChange;
                        await updateDoc(orderDoc.ref, { productsId: updatedProductsId, totalPrice: updatedTotalPrice });

                        // Update the orders state to reflect the changes
                        const updatedOrders = orders.map(order => {
                            if (order.id === orderId) {
                                return { ...order, productsId: updatedProductsId, totalPrice: updatedTotalPrice };
                            }
                            return order;
                        });
                        setOrders(updatedOrders);
                    }
                });
            });
            
            Swal.fire('Deleted!',
                'Your order has been deleted.', 'success');
        }
    } catch (error) {
        console.error('Error deleting order:', error);
        Swal.fire('Error', 'An error occurred. Please try again.', 'error');
    }
};


    

    return (
        
        <div >
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {order && (
                <div className="viewOrder">
                    <div onClick={() => setOrderDetailsId(false)} className="overlay"></div>
                    
                    <div className="view-Container">
                        <div className="closeButt">
                            <button onClick={() => setOrderDetailsId(false)}><IoMdClose/></button>
                        </div>
                        <div className="body">
                            <h1>Item List</h1>
                            <div className="title">
                                <div className="orderIdContainer">
                                    <h3>Order Id :</h3>
                                    <p>{order.orderId}</p>
                                </div>
                                <div className="dateContainer">
                                    <h3>Date/Time :</h3>
                                    <p>{order.date}</p>
                                </div>
                            </div>
                            <div className="items">
                                {order.productsId && order.productsId.length > 0 ? (
                                    <table  className='table'>
                                        <thead>
                                            <tr>
                                                <th style={{textAlign:"center"}}>NO.</th>
                                                <th style={{textAlign:"center"}}>Product Name</th>
                                                <th style={{textAlign:"center"}}>Quantity</th>
                                                <th style={{textAlign:"center"}}>Price</th>
                                                <th style={{textAlign:"center"}}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.productsId.map((product, index) => {
                                                const foundProduct = findProductById(product.productId);
                                                if (!foundProduct) {
                                                    return null;
                                                }
                                                const totalPrice = parseFloat(foundProduct.price) * parseFloat(product.quantity);
                                                return (
                                                    <tr key={index}>
                                                        <td style={{textAlign:"center"}}>{index + 1}</td>
                                                        <td style={{textAlign:"center"}}>{foundProduct.product_name}</td>
                                                        <td style={{textAlign:"center"}}>{product.quantity}</td>
                                                        <td style={{textAlign:"center"}}>{totalPrice.toFixed(2)} EGP</td>
                                                        <td style={{textAlign:"center"}}>
                                                            <button className='delete' onClick={() => handleDeleteProduct(product.productId, product.quantity)}><MdDelete /></button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div>No products found</div>
                                )}
                            </div>
                            <div className="totalPrice">Total_Price: {order.totalPrice} EGP</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderDetails;


