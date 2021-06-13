import axios from "axios";
import { baseUrl, Handler } from "./global";

export function getComments(data) {
  return new Handler(
    axios.get(baseUrl + "/comments", {
      params: data,
    })
  );
}

export function addComment(data) {
  return new Handler(axios.post(baseUrl + "/comments", data));
}
