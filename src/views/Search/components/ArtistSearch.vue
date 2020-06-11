<template>
  <div style="padding-bottom:100px;">
    <spin v-if="loading"></spin>
    <a-skeleton active :loading="loading" v-show="exactSearch.length > 0">
      <a-row type="flex" justify="start" style="margin:16px 0">
        <a-col
          :span="4"
          :offset="1"
          v-for="(ar, idx) in exactSearch"
          :key="idx"
          style="margin-bottom:16px"
        >
          <div class="img-box">
            <img
              v-lazy="ar.img1v1Url + '?param=200y200'"
              width="100%"
              alt="img"
              @click="goArtistDetail(ar.id)"
            />
          </div>
          <p class="artist-list-title">{{ ar.name }}</p>
        </a-col>
      </a-row>
    </a-skeleton>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import {
  IPageJumpConfig,
  ISearchArtist,
  ResponseSearch,
  ResponseSearchArtistResult,
  SearchParams
} from '@/utils/types';
import { searchByKeywordAndType } from '@/api/search';
import Spin from '@/components/Spin/index.vue';

@Component({
  components: { Spin }
})
export default class ArtistSearch extends Vue {
  @Prop({ default: '' })
  keywords: string | undefined;

  exactSearch: ISearchArtist[] = [];
  loading = false;

  @Watch('keywords')
  async watchKeywords(newVal: string, oldVal: string) {
    if (newVal !== oldVal) {
      await this.search({ keywords: newVal, type: 100 });
    }
  }

  private async mounted() {
    if (this.keywords !== '') {
      await this.search({ keywords: this.keywords!, type: 100 });
    }
  }
  async search(data: SearchParams) {
    this.loading = true;
    const res = await searchByKeywordAndType<
      ResponseSearch<ResponseSearchArtistResult>
    >(data);
    this.exactSearch = res.data.result.artists;
    this.loading = false;
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
}
</script>
<style scoped>
img {
  cursor: pointer;
}
</style>
