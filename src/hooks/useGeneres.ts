import { useQuery } from "@tanstack/react-query";
import genres from "../data/genres";
import apiClient from "../services/api-client";
import { FetchResponse } from "./useData";

export interface Genre {
    id: number;
    name: string;
    image_background: string;
}

const useGenres = () => {
    const fetchGenres = () => {
        return apiClient.get<FetchResponse<Genre>>('/genres')
                    .then(resp => resp.data);
    }

    return useQuery<FetchResponse<Genre>, Error>({
        queryKey: ['genres'],
        queryFn: fetchGenres,
        staleTime: 24 * 60 * 60 * 1000,  // 24 hours
        initialData: {count: genres.length, results:  genres}
    });
}

export default useGenres;