import useData from "./useData";

export interface Genre {
    id: number;
    name: string;
    slug: string;
}

const useGenres = () => {
   return useData<Genre>('/genres');
}

export default useGenres;