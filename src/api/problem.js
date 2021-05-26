import axios from "axios";
import { baseUrl } from "./global.js";

export function getProblems() {
  return axios.post(baseUrl + "/problems");
}

export function getProblem(data) {
  return axios.get(baseUrl + "/problems", {
    params: data,
  });
}
