import axios from "axios";
import { baseUrl, Handler } from "./global";

export function getAnswers(data) {
  return axios.get(baseUrl + "/answers", {
    params: data,
  });
}

export function addAnswer(data) {
  return new Handler(axios.post(baseUrl + "/answers", data));
}
