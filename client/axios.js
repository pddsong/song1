import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://8.130.74.254/api",
  withCredentials: true,
});
