<template>
  <div style="padding-bottom:100px;">
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
          <p class="artist-list-title">{{ ar.title }}</p>
        </a-col>
      </a-row>
    </a-skeleton>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { IVideo, ResponseSearchVideo, SearchParams } from '@/utils/types';
import { searchByKeywordAndType } from '@/api/search';
import PageJump from '@/utils/PageJump';
@Component({
  components: {}
})
export default class VideoSearch extends Vue {
  @Prop({ default: '' })
  keywords: string | undefined;

  exactSearch: IVideo[] = [];
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
    const res = await searchByKeywordAndType<ResponseSearchVideo>(data);
    this.exactSearch = res.data.result.videos;
    this.loading = false;
  }
  goMvDetail(id: string) {
    PageJump.pageJump({
      that: this,
      path: '/mvDetail',
      id: Number(id)
    });
  }
}
</script>
<style lang="scss" scoped></style>
