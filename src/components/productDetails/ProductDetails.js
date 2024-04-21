import './ProDetailsStyles.css'
import { Link, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { db } from "../../Config/firebase";
import { deleteDoc, doc } from 'firebase/firestore';
import { useHistory} from "react-router-dom";

const ProductDetails = () => {
    const history = useHistory();
    const { id } = useParams();
    const { error, isPending, data: products } = useFetch('Products');

    const product = products && products.find(product => product.id === id);


    const handleDelete = async (id) => {
        try {
        
        const deleteVal = doc(db, "Products", id);
        await deleteDoc(deleteVal);
        history.push("/SmartSuper-Market/Home");
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};
    const handlePass = async (id) => {
        
        console.log(product)
    }
    

    return (
        <div className="product-Details">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {product && (
                <article>
                    <div className="image">
                        <img src={product.url} alt="product-img" />
                    </div>
                    <div className="details">
                        <h2 className="name">{product.product_name}</h2>
                        <span className="description">Description : {product.description}</span>
                        <h2 className="price">{product.price} EGP</h2>
                        <span className="quantity">Quantity : {product.quantity}</span> <br /><br />
                        <Link className='linkUpdate' to={`/SmartSuper-Market/update/${product.id}`}
                            onClick={() => handlePass(product.id)}>Update</Link>
                        <button onClick={() => { 
                            const confirmBox = window.confirm("Are you sure you want to delete this product?")
                            if (confirmBox === true) {
                                handleDelete(product.id)
                            }
                        }}>Delete</button>
                        
                    </div>
                </article>
            )}
        </div>
    );
};

export default ProductDetails;
