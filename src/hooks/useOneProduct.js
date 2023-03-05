import React, { useEffect, useState } from "react";
import axios from 'axios'
import { restUrl } from "../../Constants";

export default id => {

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios.get(`${restUrl}/api/products/${id}`)
      .then(result => {
        setProduct(result.data.data)
      })
      .catch(err => {
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";

        setError(message);

      })
      .finally(() => setLoading(false))
  }, []);

  return [product, error, loading];
}