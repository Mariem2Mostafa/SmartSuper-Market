import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 

const useFetch = (collectionName) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionRef = collection(db, collectionName);
                const querySnapshot = await getDocs(collectionRef);
                const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setData(documents);
                setIsPending(false);
                setError(null);
            } catch (error) {
                setIsPending(false);
                setError(error.message);
                console.error(error);
                setData([]); // Reset data to an empty array on error
            }
        };

        fetchData();
    }, [collectionName]);

    return { data, isPending, error };
};

export default useFetch;




