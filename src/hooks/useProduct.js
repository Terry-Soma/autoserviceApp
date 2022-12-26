import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { restUrl } from '../../Constants'

export default (catId, refreshCatId = null, stopRefresh) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const searchProduct = searchValue => {
        console.log(searchValue + " түлхүүр үгээр хайлт эхэллээ...");
    };
    useEffect(() => {
        setLoading(true);
        axios.get(`${restUrl}/api/categories/${catId}/products`).then(result => {
            setProducts(result.data.data);
            setError(null);
        })
            .catch(err => {
                let message = err.message;
                if (message === "Request failed with status code 404")
                    message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
                else if (message === "Network Error")
                    message =
                        "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
                setError(message);
            }).finally(() => setLoading(false));

    }, []);
    useEffect(() => {
        if (refreshCatId !== null) {
            setLoading(true);
            console.log('хайлт ', refreshCatId !== null, "\n");

            console.log('хайлт эхэллээ refresh controller', refreshCatId, "\n"
            );
            axios.get(`${restUrl}/api/categories/${refreshCatId}/products`).then(result => {
                setProducts(result.data.data);

                setError(null);
            })
                .catch(err => {
                    let message = err.message;
                    if (message === "Request failed with status code 404")
                        message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
                    else if (message === "Network Error")
                        message =
                            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
                    setError(message);
                }).finally(() => setLoading(false));
            stopRefresh(prev => null)

        }
    }, [refreshCatId])


    return [products, error, searchProduct, loading];
}