<template>
  <playlist-detail :playlist="playList" :loading="loading"></playlist-detail>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getRankingDetail } from '@/api/ranking.ts';
import { IPlaylistFormat } from '@/utils/types/index.ts';
import { transformResponseRankingPlaylist } from '@/utils/transformPlaylistFormat.ts';
import PlaylistDetail from '@/components/PlaylistDetail/index.vue';
@Component({
  components: { PlaylistDetail }
})
export default class RankingDetail extends Vue {
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

  get idx() {
    return this.$route.query.id;
  }

  private async mounted() {
    const res = await getRankingDetail(this.idx as string);
    this.playList = transformResponseRankingPlaylist(res.data.playlist);
    this.loading = false;
  }
}
</script>
