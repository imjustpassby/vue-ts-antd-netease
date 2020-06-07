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
          <img
            v-lazy="ar.coverUrl"
            width="100%"
            alt="img"
            @click="goMvDetail(ar.vid)"
          />
          <p>{{ ar.title }}</p>
        </a-col>
      </a-row>
    </a-skeleton>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import {
  ISearchVideo,
  ResponseSearch,
  ResponseSearchVideoResult,
  SearchParams
} from '@/utils/types';
import { searchByKeywordAndType } from '@/api/search';
import PageJump from '@/utils/PageJump';
import Spin from '@/components/Spin/index.vue';
@Component({
  components: { Spin }
})
export default class VideoSearch extends Vue {
  @Prop({ default: '' })
  keywords: string | undefined;

  exactSearch: ISearchVideo[] = [];
  loading = true;

  @Watch('keywords')
  async watchKeywords(newVal: string, oldVal: string) {
    if (newVal !== oldVal) {
      await this.search({ keywords: newVal, type: 1014 });
    }
  }

  private async mounted() {
    if (this.keywords !== '') {
      await this.search({ keywords: this.keywords!, type: 1014 });
    }
  }
  async search(data: SearchParams) {
    this.loading = true;
    const res = await searchByKeywordAndType<
      ResponseSearch<ResponseSearchVideoResult>
    >(data);
    this.exactSearch = res.data.result.videos;
    this.loading = false;
  }
  goMvDetail(id: string) {
    PageJump.pageJump({
      that: this,
      path: '/videoDetail',
      id: Number(id)
    });
  }
}
</script>
<style scoped>
img {
  cursor: pointer;
}
</style>
