<template>
  <div class="dj-cate">
    <a-row type="flex" justify="start">
      <div class="dj-cate-top-title">
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size:16px; margin-right:16px;"
        >
          <use xlink:href="#icon-circle" />
        </svg>
        电台分类
      </div>
      <a-skeleton active :loading="loading1">
        <div>
          <a-col
            :span="2"
            style="margin: 6px 16px"
            v-for="(cate, index) in cateList"
            :key="index"
          >
            <img
              v-lazy="cate.pic56x56Url"
              width="40%"
              style="cursor:pointer"
              alt="img"
              @click="getDjRecommendByType(cate.id)"
            />
            <p class="dj-cate-list-title">{{ cate.name }}</p>
          </a-col>
        </div>
      </a-skeleton>
    </a-row>
    <a-row
      type="flex"
      justify="start"
      style="padding: 14px 0 0 0"
      v-if="isShowRecommend"
    >
      <div class="dj-cate-top-title">
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size:16px; margin-right:16px;"
        >
          <use xlink:href="#icon-circle" />
        </svg>
        分类推荐
        <button class="more" @click="isShowRecommend = false">收起</button>
      </div>
      <a-skeleton active :loading="loading2">
        <a-row type="flex" justify="space-around">
          <a-col
            :span="12"
            v-for="(item, index) in djRecommend"
            :key="index"
            class="djRecommend-item"
          >
            <div>
              <img
                :src="item.picUrl + '?param=50y50'"
                width="100%"
                style="cursor:pointer"
                alt="dj"
                @click="goDjDetail(item.id)"
              />
            </div>
            <p class="recommend-title" @click="goDjDetail(item.id)">
              {{ item.name }}
            </p>
          </a-col>
        </a-row>
      </a-skeleton>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getDjCateList, getDjRecommendByType } from '@/api/dj';
import {
  IDjCategory,
  IDjRecommendByType,
  IPageJumpConfig
} from '@/utils/types';
@Component({
  components: {}
})
export default class DjCate extends Vue {
  cateList: IDjCategory[] = [];
  djRecommend: IDjRecommendByType[] = [];
  isShowRecommend = false;
  loading1 = true;
  loading2 = true;
  private async mounted() {
    await this.getCateList();
    this.loading1 = false;
    this.loading2 = false;
  }

  async getCateList() {
    const res = await getDjCateList();
    this.cateList = res.data.categories;
  }

  async getDjRecommendByType(id: number) {
    this.isShowRecommend = true;
    this.loading2 = true;
    const res = await getDjRecommendByType(id);
    this.djRecommend = res.data.djRadios.slice(0, 8);
    this.loading2 = false;
  }
  goDjDetail(id: number) {
    this.pageJump({
      path: '/djDetail',
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
<style lang="less" scoped>
.dj-cate {
  padding: 14px 0;
}
.dj-cate-top-title {
  text-align: left;
  width: 100%;
  font-size: 24px;
  line-height: 1.5em;
  border-bottom: 1px solid #dddddd;
  margin-bottom: 16px;
}
.more {
  color: blueviolet;
  float: right;
  font-size: 14px;
  line-height: 2.5em;
  outline: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
}
.dj-cate-list-title {
  font-size: 12px;
  cursor: text;
  line-height: 1.5em;
}
.recommend-title {
  text-align: left;
  margin: 10px 0 0 10px;
  font-size: 14px;
  line-height: 2em;
  cursor: text;
}
.djRecommend-item {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  border-bottom: 1px solid #ddd;
  padding: 16px;
}
</style>
