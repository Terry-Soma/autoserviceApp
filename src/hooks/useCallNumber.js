
import axios from "axios";
import React, { useState, useEffect } from "react";
import { restUrl } from "../../Constants";

export default function useCallNumber() {
  const [state, setState] = useState();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`${restUrl}/api/calls`)
      .then(result => setState(result.data.data)
      )
      .catch(err => console.log('error', err?.response)
      )
      .finally(() => setLoading(false))

  }, [])

  return [state, loading, error]
}