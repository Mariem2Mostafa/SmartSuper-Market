import React  from 'react';
import './UpdateStyles.css'
import useFetch from '../useFetch';
import { useState } from 'react';
import { useParams ,useHistory } from 'react-router-dom';
import { updateDoc ,doc} from 'firebase/firestore';
import { db} from '../../firebase';
import { useEffect } from 'react';

const UpdateProduct = () => {
    const history =useHistory()
    const { id } = useParams();
    const {data: products } = useFetch('Products');
    const product = products && products.find(product => product.id === id);
    
    const [product_ID,setproduct_ID] = useState("")
    const [product_name, setProduct_name] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [error ,setError] = useState('')

    
    useEffect(() => {
        if (product) {
            setproduct_ID(product.product_ID || "");
            setProduct_name(product.product_name || "");
            setDescription(product.description || "");
            setPrice(product.price || "");
            setQuantity(product.quantity || "");
        }
    }, [product]);



    
    const handleUpdate = async (e) => {
    e.preventDefault();
    
            try {
                const updateProductRef = doc(db, "Products", id);
                await updateDoc(updateProductRef, {
                    product_ID,
                    product_name,
                    description,
                    price: Number(price),
                    quantity: Number(quantity),
                });
                console.log("Product updated successfully");
                history.push(`/SmartSuper-Market/Home/${product.id}/`);
            } catch (err) {
                console.error(err);
                setError("Failed to update product.");
            }
    }
    const handleCancel = async (e) => {
        history.push(`/SmartSuper-Market/Home/${product.id}/`);
    }
    



    return ( 
        <div className="update">
            <h2>Update Product</h2>
            
            <form >
                <label>Product ID : </label>
                <input
                    type="text"
                    className="input"
                    
                    value={product_ID}
                    onChange={(e) => setproduct_ID(e.target.value)}
                />
                <label>Product Name : </label>
                <input
                    type="text"
                    className="input"
                    
                    value={product_name}
                    onChange={(e) => setProduct_name(e.target.value)}
                />
                <label>Description : </label>
                <input
                    type="text"
                    className="input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>Price : </label>
                <input
                    type="number"
                    className="input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <label>Quantity : </label>
                <input
                    type="number"
                    className="input"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                {<button onClick={handleUpdate}>Update</button>}
                {<button onClick={handleCancel}>Cancel</button>}
            </form>
            {error && <span>{error}</span>}
        </div>
    );
}
export default UpdateProduct;