import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; 

const useFetchOrder = () => {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    

    useEffect(() => {
        const fetchOrders = async () => {
            const historyRef = collection(db, 'history');
            try {
                const querySnapshot = await getDocs(historyRef);
                const fetchedOrders = [];
                for (const doc of querySnapshot.docs) {
                    const ordersRef = collection(doc.ref, 'orders');
                    const subCollectionSnapshot = await getDocs(ordersRef);
                    const ordersData = subCollectionSnapshot.docs.map(subDoc => ({
                        id: subDoc.id,
                        ...subDoc.data()
                    }))
                    .filter(order => order.productsId && order.productsId.length > 0);
                    fetchedOrders.push(...ordersData);
                }
                setOrders(fetchedOrders);
                setIsPending(false);
                setError(null);
            } catch (error) {
                setIsPending(false);
                setError(error.message);
                console.error(error);
                setOrders([]); 
            } 
        };

        fetchOrders();
        
    }, []);
    return {orders, setOrders,isPending, error };

};

export default useFetchOrder;




