<template>
  <div>
    <a-row>
      <a-col :span="14" :offset="5">
        <banner></banner>
        <recommend></recommend>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Banner from './components/Banner.vue';
import Recommend from './components/Recommend.vue';
@Component({
  components: { Banner, Recommend }
})
export default class HomeRecommend extends Vue {}
</script>
