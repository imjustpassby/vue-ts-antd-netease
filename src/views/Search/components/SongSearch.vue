<template>
  <div style="padding-bottom:100px;">
    <spin v-if="loading"></spin>
    <playlist-table
      :tracks="tracks"
      :loading="loading"
      v-if="tracks.length > 0"
    ></playlist-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import {
  ISearchSong,
  ISongFormat,
  ResponseSearch,
  ResponseSearchSongResult,
  SearchParams
} from '@/utils/types';
import { searchByKeywordAndType } from '@/api/search';
import { transformSearchSongTracks } from '@/utils/TransformPlaylistFormat';
import PlaylistTable from '@/components/PlaylistTable/index.vue';
import Spin from '@/components/Spin/index.vue';
@Component({
  components: { PlaylistTable, Spin }
})
export default class SongSearch extends Vue {
  @Prop({ default: '' })
  keywords: string | undefined;

  loading = false;
  tracks: ISongFormat[] = [];

  @Watch('keywords')
  async watchKeywords(newVal: string, oldVal: string) {
    if (newVal !== oldVal) {
      await this.search({ keywords: newVal, type: 1 });
    }
  }

  private async mounted() {
    if (this.keywords !== '') {
      await this.search({ keywords: this.keywords!, type: 1 });
    }
  }

  async search(data: SearchParams) {
    this.loading = true;
    const res = await searchByKeywordAndType<
      ResponseSearch<ResponseSearchSongResult>
    >(data);
    this.tracks = await transformSearchSongTracks(res.data.result.songs);
    this.loading = false;
  }
}
</script>
