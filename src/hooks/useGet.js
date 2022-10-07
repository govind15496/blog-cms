import axios from 'axios';
import { useEffect, useState } from 'react';

function useGet(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      .finally(setLoading(false));
  }, [url]);

  return { data, error, loading };
}

export default useGet;
