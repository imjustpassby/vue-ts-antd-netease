<template>
  <recommend-song :tracks="tracks" :loading="loading"></recommend-song>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getProgramRecommend } from '@/api/dj';
import { ISongFormat } from '@/utils/types';
import { transformProgramRecommendList } from '@/utils/TransformNewSongFormat.ts';
import RecommendSong from '@/components/RecommendSong/index.vue';
@Component({
  components: { RecommendSong }
})
export default class RecommendProgram extends Vue {
  loading = true;
  tracks: ISongFormat[] = [];
  private async mounted() {
    const res = await getProgramRecommend();
    this.tracks = transformProgramRecommendList(res.data.programs);
    this.loading = false;
  }
}
</script>
<style lang="scss" scoped></style>
