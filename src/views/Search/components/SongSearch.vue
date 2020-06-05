<template>
  <div class="search-song">
    <playlist-table :tracks="tracks" :loading="loading"></playlist-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import {
  ISearchSong,
  ISongFormat,
  ResponseSearchSong,
  SearchParams
} from '@/utils/types';
import { searchByKeywordAndType } from '@/api/search';
import { transformSearchSongTracks } from '@/utils/TransformPlaylistFormat';
import PlaylistTable from '@/components/PlaylistTable/index.vue';
@Component({
  components: { PlaylistTable }
})
export default class extends Vue {
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

  async search(data: SearchParams) {
    this.loading = true;
    const res = await searchByKeywordAndType<ResponseSearchSong>(data);
    this.tracks = await transformSearchSongTracks(res.data.result.songs);
    this.loading = false;
  }
}
</script>
<style scoped>
.search-song {
  padding-bottom: 100px;
}
</style>
