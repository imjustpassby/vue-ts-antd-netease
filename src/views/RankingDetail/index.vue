<template>
  <playlist-detail :playlist="playList" :loading="loading"></playlist-detail>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IPlaylistFormat } from '@/utils/types/index.ts';
import { transformResponseRankingPlaylist } from '@/utils/transformPlaylistFormat.ts';
import PlaylistDetail from '@/components/PlaylistDetail/index.vue';
import Ranking from '@/api/ranking.ts';
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
    const res = await Ranking.getRankingDetail(this.idx as string);
    this.playList = transformResponseRankingPlaylist(res.data.playlist);
    this.loading = false;
  }
}
</script>
