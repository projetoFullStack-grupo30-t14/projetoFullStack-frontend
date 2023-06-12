import "dotenv";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: Number(process.env.NUMBER),
});
