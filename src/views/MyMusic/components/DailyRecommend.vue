<template>
  <div class="daily-recommend">
    <a-row>
      <a-col :span="24">
        <spin v-if="loading"></spin>
        <div class="list-title">
          <span class="title">每日推荐歌曲</span>
          <a-button @click="addMusicList" style="margin-left: 20px">
            <svg class="icon" style="font-size:16px; margin-right:16px;">
              <use xlink:href="#icon-play1" />
            </svg>
            加入播放列表
          </a-button>
        </div>
        <hr />
        <playlist-table :tracks="tracks" :loading="loading"></playlist-table>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getRecommendSongs } from '@/api/song'
import { ISongFormat, ResponseDailyRecommendSong } from '@/utils/types'
import { transformTracks } from '@/utils/TransformPlaylistFormat'
import Bus from '@/utils/Bus'
import PlaylistTable from '@/components/PlaylistTable/index.vue'
import Spin from '@/components/Spin/index.vue'
@Component({
  components: { PlaylistTable, Spin }
})
export default class DailyRecommend extends Vue {
  tracks: ISongFormat[] = []
  loading = true

  private async mounted() {
    const res = await getRecommendSongs()
    const trackIds = res.data.recommend.map(item => item.id)
    this.tracks = await transformTracks(trackIds)
    this.loading = false
  }
  addMusicList() {
    Bus.$emit('add', this.tracks)
    this.$message.success('已加入播放列表！')
  }
}
</script>
<style lang="less" scoped>
.daily-recommend {
  padding: 0 0 100px 16px;
  font-size: 14px;
  .play-icon {
    font-size: 20px;
    cursor: pointer;
  }
  .list-title {
    text-align: left;
    margin-bottom: 10px;
    & > span {
      margin: 10px;
    }
  }
  .title {
    text-align: left;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
