<template>
  <a-row>
    <a-col :span="12" :offset="6">
      <spin v-if="loading"></spin>
      <div class="mv-title">
        <h1>
          <svg
            class="icon"
            aria-hidden="true"
            style="font-size:24px; margin-right:6px;"
          >
            <use xlink:href="#icon-mv1" />
          </svg>
          {{ mvDetail.name }}
        </h1>
        <span>{{ mvDetail.artistName }}</span>
        <span>{{ mvDetail.publishTime }}</span>
      </div>
      <xg-player v-if="!loading" :config="config"></xg-player>
      <div class="mv-detail">
        <span>
          <svg
            class="icon"
            aria-hidden="true"
            style="font-size:24px; margin-right:6px;"
          >
            <use xlink:href="#icon-mv" />
          </svg>
          {{ mvDetail.playCount }}
        </span>
        <span>
          <svg
            class="icon"
            aria-hidden="true"
            style="font-size:24px; margin-right:6px;"
          >
            <use xlink:href="#icon-star" />
          </svg>
          {{ mvDetail.subCount }}
        </span>
        <span>
          <svg
            class="icon"
            aria-hidden="true"
            style="font-size:24px; margin-right:6px;"
          >
            <use xlink:href="#icon-ArtboardCopy" />
          </svg>
          {{ mvDetail.shareCount }}
        </span>
      </div>
      <comments
        :hot-comments="hotComments"
        :normal-comments="normalComments"
        :loading="loading"
      ></comments>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getCommentMv, getMvDetail, getMvUrl } from '@/api/mv';
import {
  IComment,
  IXgPlayerConfig,
  ResponseMvDetailData,
  ResponseMvUrlData
} from '@/utils/types';
import Comments from '@/components/Comments/index.vue';
import Spin from '@/components/Spin/index.vue';
import XgPlayer from '@/components/XgPlayer/index.vue';
@Component({
  components: { XgPlayer, Spin, Comments }
})
export default class MvDetail extends Vue {
  config: IXgPlayerConfig = {
    id: 'xgplayer',
    url: '',
    videoInit: true,
    fluid: true,
    poster: '',
    loop: true,
    pip: true,
    cssFullscreen: true,
    lang: 'zh-cn'
  };
  mvDetail: ResponseMvDetailData = {
    id: 0,
    name: '',
    artistId: 0,
    artistName: '',
    cover: '',
    playCount: 0,
    subCount: 0,
    shareCount: 0,
    commentCount: 0,
    publishTime: ''
  };
  hotComments: IComment[] = [];
  normalComments: IComment[] = [];
  loading = true;
  @Watch('$route', { deep: true })
  async reset() {
    this.loading = true;
    await this.getMvDetail();
    await this.getUrl();
    await this.getComment();
    this.loading = false;
  }

  private async mounted() {
    await this.reset();
  }

  async getUrl() {
    const res = await getMvUrl(Number(this.$route.query.id));
    this.config.url = res.data.data.url;
  }

  async getMvDetail() {
    const res = await getMvDetail(Number(this.$route.query.id));
    this.mvDetail = res.data.data;
    this.config.poster = this.mvDetail.cover;
  }

  async getComment() {
    const res = await getCommentMv(Number(this.$route.query.id));
    this.hotComments = res.data.hotComments;
    this.normalComments = res.data.comments;
  }
}
</script>
<style lang="scss" scoped>
.mv-title {
  margin: 16px 0;
  text-align: left;
  h1 {
    font-size: 24px;
    line-height: 2em;
  }
  span {
    margin: 0 6px;
  }
}
.mv-detail {
  text-align: left;
  span {
    margin-right: 16px;
  }
}
</style>
