<template>
  <div class="query-artist">
    <a-row type="flex" justify="start">
      <a-col
        :span="5"
        class="artist-list-item"
        v-for="(item, index) in artists"
        :key="index"
      >
        <div class="img-box">
          <img
            v-lazy="item.img1v1Url + '?param=200y200'"
            width="100%"
            alt="img"
            @click="goArtistDetail(item.id)"
          />
        </div>
        <p class="artist-list-title">{{ item.name }}</p>
      </a-col>
    </a-row>
    <a-row type="flex" justify="space-around">
      <a-col>
        <a-button @click="previous">&lt;</a-button>
        <a-button @click="next">&gt;</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import {
  ArtistByCategoryParams,
  IArtistByCategory,
  IPageJumpConfig
} from '@/utils/types';
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import { getArtistByCategory } from '@/api/artist';
@Component({
  components: {}
})
export default class QueryArtist extends Vue {
  artists: IArtistByCategory[] = [];
  currentPage: number = 1;

  @Watch('$route', { deep: true })
  async resetPage(to: any, from: any) {
    this.currentPage = 1;
    await this.queryArtist({ cat: Number(this.$route.query.cate), limit: 20 });
  }

  private async mounted() {
    await this.queryArtist({ cat: Number(this.$route.query.cate), limit: 20 });
  }

  goArtistDetail(id: number) {
    this.pageJump({
      path: '/artistDetail',
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

  async queryArtist({ cat, limit = 20 }: ArtistByCategoryParams) {
    await this.getArtists({
      cat: Number(this.$route.query.cate),
      limit: limit,
      offset: (this.currentPage - 1) * limit
    });
  }

  async getArtists({ cat, limit, offset }: ArtistByCategoryParams) {
    const res = await getArtistByCategory({
      cat,
      limit,
      offset
    });
    this.artists = res.data.artists;
  }

  async previous() {
    if (this.currentPage === 1) {
      this.$message.info('已经是第一页了...');
    } else {
      this.currentPage--;
      await this.queryArtist({
        cat: Number(this.$route.query.cate),
        limit: 20
      });
    }
  }
  async next() {
    if (this.artists.length < 20) {
      this.$message.error('没有更多了...');
    } else {
      this.currentPage++;
      await this.queryArtist({
        cat: Number(this.$route.query.cate),
        limit: 20
      });
    }
  }
}
</script>
<style lang="less" scoped>
.query-artist {
  padding: 36px 16px 100px 16px;
  font-size: 16px;
  .artist-list-item {
    margin: 16px;
  }
  & .artist-list-title {
    font-size: 14px;
    cursor: pointer;
    line-height: 1.5em;
  }
}
</style>
