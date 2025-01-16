import axios from "axios";
import { useEffect } from "react";

// create axios instance and pass backend url from .env
const instance = axios.create({
  baseURL: import.meta.env.VITE_api_url,
});

export default function useAxiosSecure() {
  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      (request) => {
        // put the token from local storage with request header
        return request;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    const responseInterceptor = instance.interceptors.request.use(
      (request) => {
        return request;
      },
      (err) => {
        //  check and logout user
        return Promise.reject(err);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return instance;
}
