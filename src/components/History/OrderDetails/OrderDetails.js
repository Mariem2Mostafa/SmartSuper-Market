import useFetch from "../../useFetch";
import { IoMdClose } from "react-icons/io";
import './OrderDetailsStyle.css';
import { MdDelete } from "react-icons/md";
import { db } from "../../../firebase";
import { updateDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2'; //confirmBox

const OrderDetails = ({ orderId, setOrderDetailsId }) => {
    const {data: orders } = useFetch('history');
    const {data: productsData } = useFetch('Products');

    const order = orders && orders.find(order => order.id === orderId);

    const findProductById = (productId) => {
        return productsData.find(product => product.id === productId);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const confirmBox = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this product!',
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33" ,
                reverseButtons: true
            });

            if (confirmBox.isConfirmed) {
                const updatedProductsId = order.productsId.filter(product => product.productId !== productId);
                const orderRef = doc(db, 'history', orderId);
                await updateDoc(orderRef, { productsId: updatedProductsId });
                Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            Swal.fire('Error', 'An error occurred. Please try again.', 'error');
        }
    };

    return ( 
        <div >
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
                                    <table >
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
                                                            <button className='delete' onClick={() => handleDeleteProduct(product.productId)}><MdDelete /></button>
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
