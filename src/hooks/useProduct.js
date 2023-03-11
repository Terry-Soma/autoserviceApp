import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { restUrl } from '../../Constants'

export default (catId, refreshing, setRefreshing) => {
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
                else if (message == "Request failed with status code 500")
                    message =
                        "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу.";
                setError(message);
            }).finally(() => setLoading(false));
    }, []);

    return [products, error, searchProduct, loading];
}