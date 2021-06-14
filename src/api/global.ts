export class Handler {
  res: any;
  constructor(res: any) {
    this.res = res;
  }
  handle = (callback: any) => {
    try {
      type ParamsType = { status: any; headers: any; data: any };
      this.res
        .then(function ({ status, headers, data }: ParamsType) {
          if (data.data) callback[status](data.data, headers);
          else callback[status](data, headers);
        })
        .catch(function (error: any) {
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
