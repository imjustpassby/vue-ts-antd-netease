<template>
  <div class="playlist-detail-container">
    <a-row>
      <a-col :span="14" :offset="5">
        <spin v-if="loading"></spin>
        <a-skeleton active :loading="loading">
          <div class="playlist-detail">
            <a-row>
              <a-col :span="5">
                <div class="img-box">
                  <img
                    v-lazy="djInfo.picUrl + '?param=200y200'"
                    width="100%"
                    style="margin-top:24px"
                    alt="电台"
                  />
                </div>
              </a-col>
              <a-col :span="18" :offset="1">
                <svg
                  class="icon"
                  aria-hidden="true"
                  style="font-size:100px; margin-right:16px;"
                >
                  <use xlink:href="#icon-zhubodiantaidaiditu" />
                </svg>
                <h1>{{ djInfo.name }}</h1>
                <div class="playlist-creator">
                  <img
                    v-lazy="djInfo.djAvatarUrl + '?param=50y50'"
                    width="36px"
                    alt
                  />
                  <span>
                    {{ djInfo.djNickname }}&nbsp;&nbsp;于&nbsp;&nbsp;
                    {{ djInfo.createTime }}&nbsp;&nbsp;创建
                  </span>
                </div>
                <div class="info-detail">
                  <span>标签：</span>
                  <a-tag color="pink">{{ djInfo.category }}</a-tag>
                </div>
                <div class="info-detail">
                  <p>最近更新：{{ djInfo.lastUpdateTime }}</p>
                  <p>签名：{{ djInfo.djSignature }}</p>
                  <p>介绍：{{ djInfo.desc }}</p>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-skeleton>
        <program-table
          :tracks="tracks"
          :region-dj-program="regionDjProgram"
          :loading="loading"
          :program-count="djInfo.programCount"
          @pageChange="pageChange"
        ></program-table>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getDjDetail, getDjProgram } from '@/api/dj';
import {
  IDjInfoFormat,
  IPagination,
  IProgramFormat,
  ISongFormat
} from '@/utils/types';
import { transformDjInfo, transformProgramTracks } from '@/utils/TransformDj';
import { transformProgramRecommendList } from '@/utils/TransformNewSongFormat';
import Bus from '@/utils/Bus';
import ProgramTable from './components/programTable.vue';
import Spin from '@/components/Spin/index.vue';
@Component({
  components: { ProgramTable, Spin }
})
export default class DjDetail extends Vue {
  djInfo: IDjInfoFormat = {
    id: 0,
    djAvatarUrl: '',
    djNickname: '',
    djSignature: '',
    name: '',
    picUrl: '',
    desc: '',
    programCount: 0,
    createTime: '',
    category: '',
    lastUpdateTime: ''
  };
  // 用于table展示的format后的数据
  tracks: IProgramFormat[] = [];
  // 暂存api返回的pragram的原始数据
  regionDjProgram: any[] = [];
  // program转化成songFormat的数据
  tracksToSongFormats: ISongFormat[] = [];
  loading = true;
  currentPage = 1;

  @Watch('$route', { deep: true })
  async reset() {
    this.loading = true;
    this.currentPage = 1;
    await this.getDjInfo();
    await this.getPrograms();
    this.loading = false;
  }

  private async mounted() {
    this.loading = true;
    await this.getDjInfo();
    await this.getPrograms();
    this.loading = false;
  }

  async getDjInfo() {
    const res = await getDjDetail(Number(this.$route.query.id));
    this.djInfo = transformDjInfo(res.data.djRadio);
  }

  async getPrograms() {
    const res = await getDjProgram({
      id: Number(this.$route.query.id),
      limit: 10,
      offset: (this.currentPage - 1) * 10
    });
    this.regionDjProgram = res.data.programs;
    this.tracks = transformProgramTracks(res.data.programs);
  }

  async pageChange(pagination: IPagination) {
    this.currentPage = pagination.current!;
    await this.getPrograms();
  }
}
</script>
<style lang="less" scoped>
.playlist-detail-container {
  padding-bottom: 100px;
  font-size: 14px;
}
.playlist-detail {
  text-align: left;
  margin-top: 16px;
  padding-bottom: 30px;
  h1 {
    font-size: 24px;
    display: inline;
    position: relative;
    top: -26px;
  }
  .playlist-creator {
    font-size: 14px;
    line-height: 3em;
    height: 40px;
    margin: -16px 0 16px 0;
    img {
      margin-right: 16px;
      float: left;
      clear: both;
      border-radius: 50%;
    }
  }
  .info-detail {
    line-height: 2em;
  }
}
</style>
