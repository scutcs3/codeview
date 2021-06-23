import axios from "axios";
import { Handler } from "./global";

export function login(data: any) {
  return new Handler(axios.post("/tokens", data));
}

export function register(data: any) {
  return new Handler(axios.post("/users", data));
}

export function changePassword(data: any) {
  return new Handler(axios.patch("/users", data));
}

export function getUsers(data: any) {
  return new Handler(
    axios.get("/users", {
      params: data,
    })
  );
}
