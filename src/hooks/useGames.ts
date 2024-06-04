import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import useData from "./useData";
import { Genre } from "./useGeneres";

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
  }

const useGames = (selectedGenre: Genre | null) => {
  return useData<Game>('/games', {params: {genres: selectedGenre?.id}}, [selectedGenre?.id]);
}

export default useGames;