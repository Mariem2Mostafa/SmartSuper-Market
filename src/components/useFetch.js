import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config/firebase'; 

const useFetch = (collectionName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionRef = collection(db, collectionName);
                const querySnapshot = await getDocs(collectionRef);
                const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setData(documents);
                setLoading(false);
                setError(null);
            } catch (error) {
                setLoading(false);
                setError(error.message);
                console.error(error);
            }
        };

        fetchData();
    }, [collectionName]);

    return { data, loading, error };
};

export default useFetch;
