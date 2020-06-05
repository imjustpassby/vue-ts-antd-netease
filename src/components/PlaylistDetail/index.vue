<template>
  <div class="playlist-detail-container">
    <a-row>
      <a-col :span="14" :offset="5" v-if="loading">
        <spin></spin>
      </a-col>
      <a-col :span="14" :offset="5">
        <playlist-info :playlist="playlist" :loading="loading"></playlist-info>
      </a-col>
      <a-col :span="14" :offset="5">
        <playlist-table
          :tracks="playlist.tracks"
          :loading="loading"
        ></playlist-table>
      </a-col>
    </a-row>
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
<style lang="scss" scoped>
.playlist-detail-container {
  padding-bottom: 100px;
  font-size: 14px;
}
</style>
