import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Genre {
    id: number;
    name: string;
    slug: string;
  }

  interface FetchGenreResponse {
    count: number;
    results: Genre[];
  }

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setErorr] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      const controller = new AbortController();
  
      setLoading(true);
      apiClient
        .get<FetchGenreResponse>("/genres", {signal: controller.signal})
        .then((resp) => {
          setGenres(resp.data.results);
          setLoading(false);
    })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setErorr(err.message)
          setLoading(false);
        });
  
      return () => controller.abort();
    }, []);
  
    return { genres, error, isLoading };
  }

export default useGenres;