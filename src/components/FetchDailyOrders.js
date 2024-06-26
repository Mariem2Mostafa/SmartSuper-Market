import './Home/HomeStyles.css'
import React, { useState, useEffect } from 'react';
import useFetch from "./useFetch";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const FetchDailyOrders = () => {
    const { data: products } = useFetch('Products');
    const { data } = useFetch('history');
    const [orders, setOrders] = useState({});


    const calculateTotalPrice = (product, quantity, products) => {
        const foundProduct = products.find(p => p.id === product.productId);
        if (!foundProduct) {
            return 0;
        }
        return parseFloat(foundProduct.price) * parseFloat(quantity);
    };

    useEffect(() => {

        const fetchOrders = async (dayId) => {
        const ordersRef = collection(db, 'history', dayId, 'orders');
        const ordersSnapshot = await getDocs(ordersRef);
        return ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        };

        if (data) {
            const ordersData = {};
            Promise.all(data.map(async (day) => {
                const dayOrders = await fetchOrders(day.id);
                if (dayOrders.length > 0) {
                    ordersData[day.id] = dayOrders.reduce((acc, order) => {
                        order.productsId.forEach(product => {
                            const { quantity, productId } = product;
                            if (acc[productId]) {
                                acc[productId].quantity += quantity;
                            } else {
                                acc[productId] = { productId, quantity };
                            }
                        });
                        return acc;
                    }, {});
                }
            })).then(() => {
                setOrders(ordersData);
                // console.log(ordersData)
            });
        }
    }, [data, products]);

    return {orders ,calculateTotalPrice,data,}
};

export default FetchDailyOrders;
