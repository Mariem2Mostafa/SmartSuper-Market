import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './Config/firebase'; 

const useFetch = (collectionName) => {
    const [productsList, setProductsList] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const productsRef = collection(db, 'Products');
    
    useEffect(() => {
    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(productsRef);
            const documents = querySnapshot.docs.map((doc => ({ id: doc.id, ...doc.data() })));
            setProductsList(documents);
            setIsPending(false);
            setError(null);
        } catch (error) {
            setIsPending(false);
            setError(error.message);
            console.error(error);
        }
    };

    fetchData();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [collectionName]);
    return { productsList, setProductsList,isPending, setError,error };
};

export default useFetch;
