import axios, { AxiosError, AxiosResponse } from 'ts-axios-new';
import Cookies from 'js-cookie';
import store from '@/store';
const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://ipassby.cloud'
      : 'http://localhost:9001'
});

request.interceptors.request.use(config => {
  config.withCredentials = true;
  if (store.state.user.loginSuccess === 'true') {
    const cookie = JSON.parse(window.sessionStorage.getItem('cookie')!);
    Cookies.set('MUSIC_U', cookie.MUSIC_U);
    Cookies.set('__csrf', cookie.__csrf);
    Cookies.set('__remember_me', cookie.__remember_me);
  }
  return config;
});

request.interceptors.response.use(
  (res: AxiosResponse) => {
    if (store.state.user.loginSuccess === 'true') {
      //每次请求结束后删除cookie
      Cookies.remove('MUSIC_U');
      Cookies.remove('__csrf');
      Cookies.remove('__remember_me');
    }
    return Promise.resolve(res);
  },
  (err: AxiosError) => {
    console.log(err);

    /* if (err.response!.status == 504) {
      Vue.prototype.$message.warning('服务器错误...');
    } else if (err.response!.status == 301) {
      Vue.prototype.$message.warning('请登录之后再体验该功能喔...');
    } */
    return Promise.reject(err);
  }
);

export default request;
