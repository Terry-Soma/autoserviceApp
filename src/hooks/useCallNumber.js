
import axios from "axios";
import React, { useState, useEffect } from "react";
import { restUrl } from "../../Constants";

export default function useCallNumber() {
  const [state, setState] = useState();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios.get(`${restUrl}/api/calls`)
      .then(result => setState(result.data.data)
      )
      .catch(err => {
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу.";
        else if (message == "Request failed with status code 500")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу.";

        setError(message)
      }
      )
      .finally(() => setLoading(false))

  }, [])

  return [state, setState, setLoading, loading, error]
}