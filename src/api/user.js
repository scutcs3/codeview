import axios from "axios";
import { baseUrl, Handler } from "./global.js";

export function login(data) {
  return new Handler(axios.post(baseUrl + "/tokens", data));
}

export function register(data) {
  return new Handler(axios.post(baseUrl + "/users", data));
}

export function changePassword(data) {
  return new Handler(axios.patch(baseUrl + "/users", data));
}
