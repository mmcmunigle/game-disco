import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { FetchResponse } from "./useData";
import platforms from "../data/platforms";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

const usePlatforms = () => {
    const fetchPlatforms = () => {
        return apiClient.get<FetchResponse<Platform>>('/platforms/lists/parents')
                        .then(resp => resp.data);
    }

   return useQuery<FetchResponse<Platform>, Error>({
        queryKey: ['platforms'],
        queryFn: fetchPlatforms,
        staleTime: 24 * 60 * 60 * 1000,  // 24 hours
        initialData: {count: platforms.length, results:  platforms}
    });
}

export default usePlatforms;