import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_api_url,
});

export default function useAxiosPublic() {
  return instance;
}
