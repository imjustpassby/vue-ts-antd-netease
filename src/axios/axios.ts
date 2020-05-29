import { AxiosRequestConfig, AxiosStatic } from './types';
import { extend } from './helpers/util';
import Axios from './core/Axios';
import Cancel, { isCancel } from './cancel/Cancel';
import CancelToken from './cancel/CancelToken';
import defaults from './defaults';
import mergeConfig from './core/mergeConfig';

// 工厂函数
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config);
  const instance = Axios.prototype.request.bind(context);
  extend(instance, context);
  return instance as AxiosStatic;
}

const axios = createInstance(defaults);

axios.create = function create(config: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config));
};

axios.Cancel = Cancel;
axios.CancelToken = CancelToken;
axios.isCancel = isCancel;

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.call(null, ...arr);
  };
};

axios.Axios = Axios;

export default axios;
