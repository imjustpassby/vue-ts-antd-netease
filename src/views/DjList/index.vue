<template>
  <a-row class="dj-list">
    <a-col :span="14" :offset="5">
      <dj-cate></dj-cate>
    </a-col>

    <a-col :span="14" :offset="5">
      <recommend-program></recommend-program>
    </a-col>

    <a-col :span="14" :offset="5">
      <dj-recommend></dj-recommend>
    </a-col>

    <a-col :span="14" :offset="5">
      <today-dj></today-dj>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DjCate from './components/DjCate.vue';
import DjRecommend from './components/DjRecomend.vue';
import RecommendProgram from './components/RecommendProgram.vue';
import TodayDj from './components/TodayDj.vue';
@Component({
  components: { DjCate, DjRecommend, RecommendProgram, TodayDj }
})
export default class DjList extends Vue {}
</script>
<style lang="scss">
.dj-list {
  font-size: 16px;
  margin-top: 16px;
  height: 100%;
  .dj-list-top-title {
    text-align: left;
    width: 100%;
    font-size: 24px;
    line-height: 1.5em;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 16px;
  }
  .dj-list-item {
    margin-top: 16px;
    img {
      cursor: pointer;
    }
  }
  .dj-list-title {
    font-size: 14px;
    cursor: pointer;
    line-height: 1.5em;
  }
}
</style>
