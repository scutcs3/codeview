export const baseUrl = process.env.VUE_APP_API;

export class Handler {
  constructor(res) {
    this.res = res;
  }
  handle = (callback) => {
    try {
      this.res
        .then(function ({ status, headers, data }) {
          callback[status](data, headers);
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
