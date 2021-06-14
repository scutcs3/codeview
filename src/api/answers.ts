import axios from "axios";
import { Handler } from "./global";

export function getAnswers(data: any) {
  return axios.get("/answers", {
    params: data,
  });
}

export function addAnswer(data: any) {
  return new Handler(axios.post("/answers", data));
}
