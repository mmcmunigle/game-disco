import axios from "axios";

export interface FetchResponse<T> {
    count: number;
    results: T[];
  }

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '3917d1f5959e4a2ca5c1bf6979f16931'
    }
});