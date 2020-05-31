import { namespace } from 'vuex-class';
import axios from 'ts-axios-new';
import Cookies from 'js-cookie';
import Vue from 'vue';

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://ipassby.cloud'
      : 'http://localhost:9001'
});

instance.interceptors.request.use(config => {
  config.params = {
    _t: Number(new Date())
  };
  /*   if (Vue.prototype.$store.state.user.loginSuccess === 'true') {
    const cookie = window.sessionStorage.getItem('cookie')!;
    Cookies.set('MUSIC_U', JSON.parse(cookie).MUSIC_U);
    Cookies.set('__csrf', JSON.parse(cookie).__csrf);
    Cookies.set('__remember_me', JSON.parse(cookie).__remember_me);
  } */
  return config;
});

instance.interceptors.response.use(
  res => {
    return Promise.resolve(res);
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

export default instance;
