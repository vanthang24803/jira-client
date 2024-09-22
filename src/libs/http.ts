import axios from "axios";
import Cookies from "js-cookie";
import { env } from "@/utils/env";
import { jwtDecode } from "jwt-decode";

import { fromUnixTime, compareAsc } from "date-fns";

async function refreshTokenRequest(refreshToken: string | undefined) {
  const response = await axios.post(`${env.API_URL}/auth/refresh`, {
    token: refreshToken,
  });
  if (response.status === 200) {
    Cookies.set("ac_token", response.data.result.ac_token);
    Cookies.set("rf_token", response.data.result.rf_token);
    return `Bearer ${response.data.result.ac_token}`;
  } else {
    throw new Error("Failed to refresh token");
  }
}

const _http = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

_http.interceptors.request.use(async (req) => {
  let accessToken = Cookies.get("ac_token");

  if (accessToken) {
    const payload = jwtDecode(accessToken);
    if (payload.exp) {
      const isExpired = compareAsc(fromUnixTime(payload.exp), new Date()) < 1;

      if (isExpired) {
        const refreshToken = Cookies.get("rf_token");
        req.headers.Authorization = await refreshTokenRequest(refreshToken);
      } else {
        req.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
  }

  return req;
});

export default _http;
