import './assets/style/global.less'; // 自定义的全局样式
// import '@/utils/core/components-ant.ts'; // dev模式开启， prod模式注释
import antd from 'ant-design-vue'; // prod模式开启
import App from './App.vue';
import router from './router';
import store from './store';
import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
Vue.use(antd); // prod模式开启
Vue.use(VueLazyLoad, {
  error: require('../public/loading.gif'),
  loading: require('../public/loading.gif')
});
Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV === 'development'; // 生产环境下不允许使用 devtools

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
