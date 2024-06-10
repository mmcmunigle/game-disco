import apiClient from "../services/api-client";
import { FetchResponse } from "./useData";
import { GameQuery } from "../App";
import { useQuery } from "@tanstack/react-query";

export interface Platform {
  id: number,
  name: string,
  slug: string,
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: {platform: Platform}[];
    metacritic: number;
    rating_top: number;
  }

const useGames = (gameQuery: GameQuery) => {
 return useQuery<FetchResponse<Game>, Error>({
    queryKey: ['games', gameQuery],
    queryFn: () => apiClient.get<FetchResponse<Game>>('/games', {
      params: {
        genres: gameQuery.genre?.id,
        platforms: gameQuery.platform?.id,
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchText
      },
    })
    .then(resp => resp.data)
  })
}

export default useGames;