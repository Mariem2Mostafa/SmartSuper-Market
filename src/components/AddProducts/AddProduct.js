import './AddStyle.css'
import React, { useState } from "react";
import { storage, db } from "../../firebase";
import {doc, setDoc} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddProduct = () => {
    const [product_name, setProduct_name] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isPending, setIsPending] = useState(false);

    const types = ["image/jpg", "image/jpeg", "image/png"];

    const handleProductImg = (e) => {
        const selectedImgFile = e.target.files[0];
        if (selectedImgFile && types.includes(selectedImgFile.type)) {
            setImage(selectedImgFile);
            setError('');
        } else {
            setImage(null);
            setError("Select a valid image file like (image/jpg or image/jpeg)");
        }
    };

    const handleAddProducts = (e) => {
    e.preventDefault();
    setIsPending(true);

    const uniqueProductID = Math.floor(Math.random() * 100000).toString();

    const storageRef = ref(storage, `productsImages/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
        'state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        },
        (error) => {
            console.log(error);
            setError("Failed to upload image.");
            setIsPending(false);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then(async (imgeURL) => {
                    const productDocRef = doc(db, 'Products', uniqueProductID);
                    await setDoc(productDocRef, {
                        product_ID: uniqueProductID,
                        product_name,
                        description,
                        price:Number(price),
                        quantity: Number(quantity),
                        url: imgeURL
                    });
                    setSuccessMsg('Product Added Successfully');
                    setProduct_name('');
                    setPrice('');
                    setDescription('');
                    setQuantity('');
                    setImage(null);
                    setIsPending(false);
                    setTimeout(() => setSuccessMsg(''), 3000);
                })
                .catch(err => {
                    setError(err.message);
                    setIsPending(false);
                });
        }
    );
};


    return (
        <div className="create">
            <h2>Add a New Product</h2>
            {successMsg && 
                <div className="success-msg">{successMsg}</div>
            }
            <form onSubmit={handleAddProducts}>
                <label>Product_Name : </label>
                <input
                    type="text"
                    className="input"
                    required
                    value={product_name}
                    onChange={(e) => setProduct_name(e.target.value)}
                />
                <label>Description : </label>
                <input
                    type="text"
                    className="input"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>Price : </label>
                <input
                    type="number"
                    className="input"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <label>Quantity : </label>
                <input
                    type="number"
                    className="input"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                /> 
                <label>Upload Product Image : </label>
                <input type="file" id="file" className="form-control" required onChange={handleProductImg} />
                {!isPending && <button>Add Product</button>}
                {isPending && <button>Adding Product...</button>}
            </form>
            {error && <span>{error}</span>}
        </div>
    );
};

export default AddProduct;
