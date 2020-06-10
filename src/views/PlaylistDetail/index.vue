<template>
  <playlist-detail :playlist="playList" :loading="loading"></playlist-detail>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getPlaylistDetail } from '@/api/playlist.ts';
import { getRankingDetail } from '@/api/ranking.ts';
import { IPlaylistFormat } from '@/utils/types/index.ts';
import { transformResponsePlaylist } from '@/utils/TransformPlaylistFormat.ts';
import PlaylistDetail from '@/components/PlaylistDetail/index.vue';
@Component({
  components: { PlaylistDetail }
})
export default class PlaylistDetailPage extends Vue {
  loading = true;
  playList: IPlaylistFormat = {
    id: 0,
    creator: '',
    userId: 0,
    name: '',
    cover: '',
    updateTime: '',
    description: '',
    trackIds: [],
    tracks: [],
    tags: []
  };
  get id() {
    return this.$route.query.id;
  }
  get type() {
    return this.$route.query.type;
  }
  @Watch('$route', { deep: true })
  async reset(to: any, from: any) {
    this.loading = true;
    await this.getPlaylist();
    this.loading = false;
  }
  private async mounted() {
    await this.getPlaylist();
    this.loading = false;
  }

  async getPlaylist() {
    const res = await getPlaylistDetail(Number(this.id));
    this.playList = await transformResponsePlaylist(res.data.playlist);
  }
}
</script>
<style lang="scss" scoped></style>
