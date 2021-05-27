import axios from "axios";
import { baseUrl, Handler } from "./global.js";

export function getComments(data) {
  return axios.get(baseUrl + "/comments", {
    params: data,
  });
}

export function addComment(data) {
  return new Handler(axios.post(baseUrl + "/comments", data));
}
