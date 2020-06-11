<template>
  <a-skeleton active :loading="loading">
    <div class="album-list">
      <a-row type="flex" justify="start">
        <a-col
          :span="5"
          style="margin:16px"
          v-for="(item, index) in mvList"
          :key="index"
          @click="goMvDetail(item.id)"
        >
          <img
            v-lazy="item.imgurl16v9"
            width="100%"
            alt="img"
            style="cursor:pointer"
          />
          <p class="album-list-title">{{ item.name }}</p>
        </a-col>
      </a-row>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getArtistMv } from '@/api/artist';
import { IArtistMv, IPageJumpConfig } from '@/utils/types';
@Component({
  components: {}
})
export default class ArtistMv extends Vue {
  loading = true;
  mvList: IArtistMv[] = [];
  private async mounted() {
    const res = await getArtistMv(Number(this.$route.query.id));
    this.mvList = res.data.mvs;
    this.loading = false;
  }
  goMvDetail(id: number) {
    this.pageJump({
      path: '/videoDetail',
      id
    });
  }
  pageJump(config: IPageJumpConfig) {
    const { id, path } = config;
    this.$router.push({
      path: path,
      query: {
        id: id!.toString()
      }
    });
  }
}
</script>
