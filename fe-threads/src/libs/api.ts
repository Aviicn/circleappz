import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

export function setAuthToken(token: string) {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
}
