import { AxiosRequestConfig } from './types';
import { processHeaders } from './helpers/headers';
import { transformRequest, transformResponse } from './helpers/data';

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  xsrfCookieName: 'XSRF-TOKEN',

  xsrfHeaderName: 'X-XSRF-TOKEN',

  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data);
      return transformRequest(data);
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data);
    }
  ],
  validateStatus(status: number): boolean {
    return (status >= 200 && status < 300) || status === 304;
  }
};

const methodsNoData = ['get', 'head', 'delete', 'options'];
const methodsWithData = ['post', 'put', 'patch'];

methodsNoData.forEach(method => {
  defaults.headers[method] = {};
});

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
});

export default defaults;
