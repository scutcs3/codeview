import axios from "axios";
import { Handler } from "./global";

export function getComments(data: any) {
  return new Handler(
    axios.get("/comments", {
      params: data,
    })
  );
}

export function addComment(data: any) {
  return new Handler(axios.post("/comments", data));
}
