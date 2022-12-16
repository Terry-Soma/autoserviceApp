import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { restUrl } from '../../Constants'

export default (catId) => {

    const [products, setProducts] = useState([
        {
            "categoryId": 1,
            "come_date": "2022-02-13",
            "id": 1,
            "img": "parado1.jpg",
            "location": "Гаражны хойд тавиур",
            "ner": "95 урд гэрэл",
            "serNum": "",
            "shirheg": 12,
            "une": 100,
        },
        {
            "categoryId": 1,
            "come_date": "2022-02-13",
            "id": 2,
            "img": "parado1.jpg",
            "location": "Гаражны хойд тавиур",
            "ner": "185 урд гэрэл",
            "serNum": "",
            "shirheg": 12,
            "une": 100,
        },
        {
            "categoryId": 1,
            "come_date": "2022-02-13",
            "id": 3,
            "img": "parado1.jpg",
            "location": "Гаражны хойд тавиур",
            "ner": "185 хойд бөгсний гэрэл",
            "serNum": "",
            "shirheg": 12,
            "une": 100,
        },
        {
            "categoryId": 1,
            "come_date": "2022-02-13",
            "id": 4,
            "img": "parado1.jpg",
            "location": "Гаражны хойд тавиур",
            "ner": "95 дохио",
            "serNum": "",
            "shirheg": 12,
            "une": 100,
        },
        {
            "categoryId": 1,
            "come_date": "2022-02-13",
            "id": 5,
            "img": "parado1.jpg",
            "location": "Гаражны хойд тавиур",
            "ner": "185 дохио",
            "serNum": "",
            "shirheg": 12,
            "une": 100,
        },
        {
            "categoryId": 1,
            "come_date": "2022-02-13",
            "id": 6,
            "img": "parado1.jpg",
            "location": "Гаражны хойд тавиур",
            "ner": "185 нэмэлт гүперний гэрэл",
            "serNum": "",
            "shirheg": 12,
            "une": 100,
        },
    ]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const searchProduct = searchValue => {
        console.log(searchValue + " түлхүүр үгээр хайлт эхэллээ...");
    };
    // useEffect(() => {
    //     setLoading(true);
    //     axios.get(`${restUrl}/api/categories/${catId}/products`).then(result => {
    //         setProducts(result.data.data);
    //         setError(null);
    //     })
    //         .catch(err => {
    //             let message = err.message;
    //             if (message === "Request failed with status code 404")
    //                 message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
    //             else if (message === "Network Error")
    //                 message =
    //                     "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
    //             setError(message);
    //         }).finally(() => setLoading(false));

    // }, [])

    return [products, error, searchProduct, loading];
}