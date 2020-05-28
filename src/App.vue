<template>
  <div id="app">
    <a-config-provider :locale="zh_CN">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import 'moment/locale/zh-cn';
import moment from 'moment';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

moment.locale('zh-cn');
export default {
  data() {
    return {
      zh_CN
    };
  },
  mounted() {
    document.getElementById('app').style.display = 'block';
    document.getElementById('appLoading').style.display = 'none';
  }
};
</script>
