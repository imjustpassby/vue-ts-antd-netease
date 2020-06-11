<template>
  <div class="spin">
    <a-spin size="large"></a-spin>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class Spin extends Vue {}
</script>
<style lang="less" scoped>
.spin {
  height: 100vh;
  border-radius: 4px;
  padding-top: 30%;
  text-align: center;
}
</style>
