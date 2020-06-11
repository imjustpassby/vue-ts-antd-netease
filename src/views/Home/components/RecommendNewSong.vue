<template>
  <recommend-song
    :tracks="tracks"
    :loading="loading"
    title="最新音乐"
  ></recommend-song>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getPersonalizedNewSong } from '@/api/home.ts';
import { ISongFormat } from '@/utils/types';
import { transformPlayList } from '@/utils/TransformNewSongFormat.ts';
import RecommendSong from '@/components/RecommendSong/index.vue';
@Component({
  components: { RecommendSong }
})
export default class RecommendNewSong extends Vue {
  tracks: ISongFormat[] = [];
  loading = true;
  private async mounted() {
    const res = await getPersonalizedNewSong();
    this.tracks = transformPlayList(res.data.result as []);
    this.loading = false;
  }
}
</script>
<style lang="less" scoped></style>
