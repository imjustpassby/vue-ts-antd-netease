<template>
  <div style="padding-bottom:120px">
    <spin v-if="loading"></spin>
    <playlist-info :playlist="playlist" :loading="loading"></playlist-info>
    <playlist-table
      :tracks="playlist.tracks"
      :loading="loading"
    ></playlist-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IPlaylistFormat } from '@/utils/types/index.ts';
import PlaylistInfo from '@/components/PlaylistInfo/index.vue';
import PlaylistTable from '@/components/PlaylistTable/index.vue';
import Spin from '@/components/Spin/index.vue';
@Component({
  components: { Spin, PlaylistTable, PlaylistInfo }
})
export default class PlaylistDetailComponent extends Vue {
  @Prop({ required: true })
  playlist: IPlaylistFormat | undefined;

  @Prop({ required: true })
  loading: boolean | undefined;
}
</script>
