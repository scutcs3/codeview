export const baseUrl = 'https://virtserver.swaggerhub.com/tootal/codeview/1.0.0';

export class Handler {
    constructor(res) {
        this.res = res;
    }
    handle = (callback) => {
        this.res.then(function({ status, headers, data }) {
            callback[status](data, headers);
        })
    }
}