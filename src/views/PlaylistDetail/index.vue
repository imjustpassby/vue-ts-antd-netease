<template>
  <playlist-detail :playlist="playList" :loading="loading"></playlist-detail>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
  private async mounted() {
    const res = await getPlaylistDetail(this.id as string);
    this.playList = await transformResponsePlaylist(res.data.playlist);
    this.loading = false;
  }
}
</script>
<style lang="scss" scoped></style>
