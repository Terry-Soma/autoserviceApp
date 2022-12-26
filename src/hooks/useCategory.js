import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { restUrl } from '../../Constants';

export default () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${restUrl}/api/categories`)
      .then(result => {
        console.log("Категорийг амжилттай хүлээж авлаа...");

        setCategories(result.data.data);
        setError(null);
      })
      .catch(err => {
        console.log("err", err);
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу.";
        setError(message);
      }).finally(() => setLoading(false));
  }, []);

  return [categories, error, loading];
}