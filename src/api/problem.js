import axios from "axios";
import { baseUrl, Handler } from "./global.js";

export function getProblems() {
  return new Handler(axios.get(baseUrl + "/problems"));
}

export function getProblem(data) {
  return axios.get(baseUrl + "/problems", {
    params: data,
  });
}
