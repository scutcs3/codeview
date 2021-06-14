import axios from "axios";
import { Handler } from "./global";

export function getInterviews() {
  return new Handler(axios.get("/interviews"));
}

export function getInterview(data: any) {
  return axios.get("/interviews", {
    params: data,
  });
}

export function createInterview(data: any) {
  return new Handler(axios.post("/interviews", data));
}

export function modifyInterview(data: any) {
  return new Handler(axios.patch("/interviews", data));
}
