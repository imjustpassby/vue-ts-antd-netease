<template>
  <a-row>
    <a-col :span="14" :offset="5">
      <a-row>
        <a-col :span="4">
          <choose-category @queryArtist="queryArtist"></choose-category>
        </a-col>
        <a-col :span="20">
          <recommend-artist v-if="!isQuery"></recommend-artist>
          <query-artist
            v-else
            :artists="artists"
            :current-page="currentPage"
            @queryArtist="queryArtist"
            @previous="previous"
            @next="next"
          ></query-artist>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { ArtistByCategoryParams, IArtistByCategory } from '@/utils/types';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getArtistByCategory } from '@/api/artist';
import ChooseCategory from './components/ChooseCategory.vue';
import QueryArtist from './components/QueryArtist.vue';
import RecommendArtist from './components/RecommendArtist.vue';
@Component({
  components: { ChooseCategory, QueryArtist, RecommendArtist }
})
export default class ArtistListWithCate extends Vue {
  isQuery = false;
  artists: IArtistByCategory[] = [];
  currentPage = 1;
  @Watch('$route', { deep: true })
  resetPage(to: any, from: any) {
    if (to.query.cate !== from.query.cate) {
      this.currentPage = 1;
    }
  }

  async queryArtist({ cat, limit = 20 }: ArtistByCategoryParams) {
    if (cat != 9999) {
      this.isQuery = true;
      await this.getArtists({
        cat: Number(this.$route.query.cate),
        limit: limit,
        offset: (this.currentPage - 1) * limit
      });
    } else {
      this.isQuery = false;
    }
  }

  async getArtists({ cat, limit, offset }: ArtistByCategoryParams) {
    const res = await getArtistByCategory({
      cat,
      limit,
      offset
    });
    this.artists = res.data.artists;
  }

  async previous(cate: number) {
    console.log('cate: ', cate);
    if (this.currentPage === 1) {
      this.$message.info('已经是第一页了...');
    } else {
      this.currentPage--;
      await this.queryArtist({ cat: cate, limit: 20 });
    }
  }
  async next(cate: number) {
    if (this.artists.length < 20) {
      this.$message.error('没有更多了...');
    } else {
      this.currentPage++;
      await this.queryArtist({ cat: cate, limit: 20 });
    }
  }
}
</script>
