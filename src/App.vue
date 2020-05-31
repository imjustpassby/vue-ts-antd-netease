<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class App extends Vue {
  mounted() {
    document.getElementById('app')!.style.display = 'block';
    document.getElementById('appLoading')!.style.display = 'none';
  }
}
</script>
