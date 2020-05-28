<template>
  <div class="">
    <a-back-top style="bottom: 100px;left:10%" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class extends Vue {
  private mounted() {
    console.log('mounted');
  }
}
</script>
<style lang="scss" scoped></style>
