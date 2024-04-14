import React  from 'react';
import '../StylesPages.css'
import useFetch from '../useFetch';
import { useState } from 'react';
import { useParams ,useHistory } from 'react-router-dom';
import { updateDoc ,doc} from 'firebase/firestore';
import { db, storage } from '../Config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
    const [image, setImage] = useState(null);
    const [error ,setError] = useState('')

    
    useEffect(() => {
        if (product) {
            setProduct_name(product.product_name || "");
            setDescription(product.description || "");
            setPrice(product.price || "");
            setQuantity(product.quantity || "");
            setImage(product.url || "");
        }
    }, [product]);

    const types = ["image/jpg", "image/jpeg", "image/png"];
    
    const handleUpdateImage = (e) => {
        const Imgfile = e.target.files[0];
        if (Imgfile && types.includes(Imgfile.type)) {
            setImage(Imgfile);
            setError('');
        } else if(!Imgfile){
            return;
        }
        else {
            setImage(null);
            setError("Select a valid image file like (image/jpg or image/jpeg)");
        }
    };

    
    const handleUpdate = async (e) => {
    e.preventDefault();
    if (!image) {
        setError("Please select an image.");
        return;
    }

    const storageRef = ref(storage, `productsImages/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
        },
        (error) => {
            console.error(error);
            setError("Failed to upload image.");
        },
        async () => {
            try {
                const url = await getDownloadURL(storageRef);
                const updateProductRef = doc(db, "Products", id);
                await updateDoc(updateProductRef, {
                    product_name,
                    description,
                    price: Number(price),
                    quantity: Number(quantity),
                    url: url
                });
                console.log("Product updated successfully");
                history.push(`/Home/${product.id}/${product.product_name}`);
            } catch (err) {
                console.error(err);
                setError("Failed to update product.");
            }
        }
    );
};


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
                <label>Upload Product Image : </label>
                <input
                    type="file"
                    id="file"
                    className="form-control"
                    onChange={handleUpdateImage}
                    required
                    
                />
                {<button>Update</button>}
            </form>
            {error && <span>{error}</span>}
        </div>
    );
}
export default UpdateProduct;