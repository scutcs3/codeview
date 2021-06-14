import axios from "axios";
import { Handler } from "./global";

export function getProblems(data: any) {
  return new Handler(
    axios.get("/problems", {
      params: data,
    })
  );
}

export function getProblem(data: any) {
  return new Handler(
    axios.get("/problems", {
      params: data,
    })
  );
}

export function addProblem(data: any) {
  return new Handler(axios.post("/problems", data));
}

export function removeProblem(data: any) {
  return new Handler(axios.delete("/problems", data));
}

export function modifyProblem(data: any) {
  return new Handler(axios.patch("/problems", data));
}
