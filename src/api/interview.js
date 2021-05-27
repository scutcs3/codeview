import axios from "axios";
import { baseUrl, Handler } from "./global.js";

export function getInterviews() {
  return new Handler(axios.get(baseUrl + "/interviews"));
}

export function getInterview(data) {
  return axios.get(baseUrl + "/interviews", {
    params: data,
  });
}

export function createInterview(data) {
  return new Handler(axios.post(baseUrl + "/interviews", data));
}

export function modifyInterview(data) {
  return new Handler(axios.patch(baseUrl + "/interviews", data));
}
