import axios from "axios";
import React, { useState, useEffect } from "react";
import { restUrl } from "../../Constants";


export default function useTopProduct() {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true);

    axios.get(`${restUrl}/api/products/top-10`).then(result => {
      setTopProducts(result.data.data);
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
    return () => setTopProducts([])
  }, []);
  return [topProducts, loading, error];
}