import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";


  interface FetchResponse<T> {
    count: number;
    results: T[];
  }

const useData = <T>(endpoint: string) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setErorr] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      const controller = new AbortController();
  
      setLoading(true);
      apiClient
        .get<FetchResponse<T>>(endpoint, {signal: controller.signal})
        .then((resp) => {
            setData(resp.data.results);
          setLoading(false);
    })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setErorr(err.message)
          setLoading(false);
        });
  
      return () => controller.abort();
    }, []);
  
    return { data, error, isLoading };
  }

export default useData;