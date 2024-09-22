import axios from "axios";
import { env } from "@/utils/env";

const _http = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default _http;
