<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
@Component
export default class App extends Vue {
  private locale = zhCN;
  mounted() {
    document.getElementById('app')!.style.display = 'block';
    document.getElementById('appLoading')!.style.display = 'none';
  }
}
</script>
