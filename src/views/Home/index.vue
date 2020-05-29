<template>
  <div>
    <a-back-top style="bottom: 100px;left:10%" />
    <a-row>
      <a-col :span="14" :offset="5">
        <banner></banner>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Banner from './components/Banner.vue';
@Component({
  components: { Banner }
})
export default class extends Vue {
  private mounted() {
    console.log('mounted');
  }
}
</script>
<style lang="scss" scoped></style>
