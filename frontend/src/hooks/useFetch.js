import { useEffect, useState } from "react";
import { apiRequest } from "../api/client";

export const useFetch = (path) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const result = await apiRequest(path);
        if (mounted) {
          setData(result);
          setError("");
        }
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [path]);

  return { data, error, loading, setData };
};
