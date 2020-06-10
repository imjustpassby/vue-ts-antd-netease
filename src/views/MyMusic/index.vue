<template>
  <a-row style="padding-top:30px">
    <a-col :span="4" :offset="4">
      <user-playlist
        @showPlaylist="showPlaylist"
        @closePlaylist="closePlaylist"
      ></user-playlist>
    </a-col>
    <a-col :span="12" v-if="!isShow">
      <daily-recommend></daily-recommend>
    </a-col>
    <a-col :span="12" :offset="1" v-else>
      <spin v-if="loading"></spin>
      <playlist-detail
        :playlist="playList"
        :loading="loading"
      ></playlist-detail>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getPlaylistDetail } from '@/api/playlist.ts';
import { IPlaylistFormat, showPlaylistParams } from '@/utils/types/index.ts';
import { transformResponsePlaylist } from '@/utils/TransformPlaylistFormat.ts';
import DailyRecommend from './components/DailyRecommend.vue';
import PlaylistDetail from '@/components/PlaylistDetail/index.vue';
import Spin from '@/components/Spin/index.vue';
import UserPlaylist from './components/UserPlaylist.vue';
@Component({
  components: { DailyRecommend, UserPlaylist, PlaylistDetail, Spin }
})
export default class MyMusic extends Vue {
  isShow = false;
  showUnsubscribeBtn = true;
  loading = true;
  playList: IPlaylistFormat = {
    id: 0,
    creator: '',
    name: '',
    cover: '',
    createTime: '',
    updateTime: '',
    description: '',
    trackIds: [],
    tracks: [],
    tags: []
  };

  async showPlaylist(data: showPlaylistParams) {
    if (data.type === 'self') {
      this.showUnsubscribeBtn = false;
    } else if (data.type === 'other') {
      this.showUnsubscribeBtn = true;
    }
    window.scrollTo(0, 0);
    this.isShow = true;
    await this.getListDetail(data.playlist.id);
  }
  closePlaylist() {
    this.isShow = false;
  }

  async getListDetail(id: number) {
    this.loading = true;
    const res = await getPlaylistDetail(id);
    this.playList = await transformResponsePlaylist(res.data.playlist);
    this.loading = false;
  }
}
</script>
