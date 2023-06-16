import axios from "axios";

export const api = axios.create({
  baseURL: process.env.api_base_url,
  timeout: Number(process.env.timeout),
});
