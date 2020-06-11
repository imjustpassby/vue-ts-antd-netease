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
</style>
