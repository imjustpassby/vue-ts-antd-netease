<template>
  <div id="xgplayer"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IXgPlayerConfig } from '@/utils/types';
@Component({
  components: {}
})
export default class XgPlayer extends Vue {
  @Prop({ required: true })
  config: IXgPlayerConfig | undefined;

  private mounted() {
    // cdn引入
    const player = new xgplayer(this.config);
  }
}
</script>
<style lang="scss" scoped>
#xgplayer {
  overflow: hidden;
  margin: 16px 0;
}
</style>
