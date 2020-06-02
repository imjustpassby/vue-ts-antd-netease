<template>
  <div class="recommend">
    <a-row>
      <a-col :span="24">
        <recommend-playlist></recommend-playlist>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <recommend-new-song></recommend-new-song>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <recommend-mv></recommend-mv>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <recommend-dj></recommend-dj>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RecommendDj from './RecommendDj.vue';
import RecommendMv from './RecommendMv.vue';
import RecommendNewSong from './RecommendNewSong.vue';
import RecommendPlaylist from './RecommendPlaylist.vue';
@Component({
  components: {
    RecommendDj,
    RecommendMv,
    RecommendNewSong,
    RecommendPlaylist
  }
})
export default class Recommend extends Vue {}
</script>
<style lang="less">
.recommend {
  padding-bottom: 100px;
}
.recommend-item {
  text-align: left;
  padding: 16px;
  & > div {
    width: 100%;
    font-size: 24px;
    line-height: 1.5em;
    border-bottom: 1px solid #dddddd;
  }
  .recommend-new-songs {
    border-bottom: 1px solid #ddd;
    margin-right: 16px;
    .play {
      position: absolute;
      height: 50%;
      width: 50%;
      left: 40%;
      top: 25%;
      z-index: 9;
      cursor: pointer;
    }
  }
}
</style>
