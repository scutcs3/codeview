import { CV_API } from "../global";
export const baseUrl: string = CV_API;
export class Handler {
  res: any;
  constructor(res) {
    this.res = res;
  }
  handle = (callback) => {
    try {
      this.res
        .then(function ({ status, headers, data }) {
          if (data.data) callback[status](data.data, headers);
          else callback[status](data, headers);
        })
        .catch(function (error) {
          if (error.response) {
            try {
              callback[error.response.status]();
            } catch (e) {
              callback[404]();
            }
          } else {
            callback[404]();
          }
        });
    } catch (e) {
      callback[404]();
    }
  };
}