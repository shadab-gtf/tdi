import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "../../../config";

const apiPublicClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

export default apiPublicClient;
