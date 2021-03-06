import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import * as config from "../config/http.json";

function createAxios(): AxiosInstance {
  const instance = axios.create({
    baseURL: config.base_url_dev,
  });

  instance.interceptors.request.use(
    async (request: AxiosRequestConfig) => {
      return request;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      return Promise.reject(error.response?.data);
    }
  );
  return instance;
}
export const useAxios = createAxios();
