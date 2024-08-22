import axios, { AxiosError } from "axios";
import { useObterToken } from "../hooks";
import { history } from "../App";

const http = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Accept: "application/json",
    Content: "application/json",
  },
});

http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = useObterToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    console.log("Erro no interceptor do axios");
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response?.status === 401) {
      history.push("/");
      return Promise.reject();
    }
    return Promise.reject(error);
  }
);

export default http;
