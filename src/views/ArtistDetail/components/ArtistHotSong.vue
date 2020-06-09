<template>
  <playlist-table
    v-if="hotSongs.length > 0"
    :tracks="hotSongs"
    :loading="loading"
  ></playlist-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ISongFormat } from '@/utils/types';
import PlaylistTable from '@/components/PlaylistTable/index.vue';
@Component({
  components: { PlaylistTable }
})
export default class ArtistHotSong extends Vue {
  @Prop({ required: true })
  hotSongs: ISongFormat[] | undefined;
  @Prop({ required: true })
  loading: boolean | undefined;
}
</script>
<style lang="scss" scoped></style>
