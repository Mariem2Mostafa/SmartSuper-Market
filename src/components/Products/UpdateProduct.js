import React  from 'react';
import '../StylesPages.css'
import useFetch from '../useFetch';
import { useState } from 'react';
import { useParams ,useHistory } from 'react-router-dom';
import { updateDoc ,doc} from 'firebase/firestore';
import { db} from '../Config/firebase';
import { useEffect } from 'react';

const UpdateProduct = () => {
    const history =useHistory()
    const { id } = useParams();
    const {productsList: products } = useFetch('Products');
    const product = products && products.find(product => product.id === id);
    

    const [product_name, setProduct_name] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [error ,setError] = useState('')

    
    useEffect(() => {
        if (product) {
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
                    product_name,
                    description,
                    price: Number(price),
                    quantity: Number(quantity),
                });
                console.log("Product updated successfully");
                history.push(`/Home/${product.id}/${product.product_name}`);
            } catch (err) {
                console.error(err);
                setError("Failed to update product.");
            }
    }
    const handleCancel = async (e) => {
        history.goBack();
    }
    



    return ( 
        <div className="update">
            <h2>Update Product</h2>
            
            <form onSubmit={handleUpdate}>
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
                
                {<button onClick={handleCancel}>Cancel</button>}
                {<button>Update</button>}
            </form>
            {error && <span>{error}</span>}
        </div>
    );
}
export default UpdateProduct;