import axios from "axios";
import { baseUrl, Handler } from "./global.js";

export function getProblems() {
  return new Handler(axios.get(baseUrl + "/problems"));
}

export function getProblem(data) {
  return new Handler(
    axios.get(baseUrl + "/problems", {
      params: data,
    })
  );
}

export function addProblem(data) {
  return new Handler(axios.post(baseUrl + "/problems", data));
}

export function removeProblem(data) {
  return new Handler(axios.delete(baseUrl + "/problems", data));
}

export function modifyProblem(data) {
  return new Handler(axios.patch(baseUrl + "/problems", data));
}
