<template>
  <div class="dj-list">
    <div class="dj-list-top-title">
      <svg
        class="icon"
        aria-hidden="true"
        style="font-size:16px; margin-right:16px;"
      >
        <use xlink:href="#icon-circle" />
      </svg>
      {{ name }}
    </div>
    <a-skeleton active :loading="loading">
      <a-row type="flex" justify="space-around">
        <a-col
          :span="4"
          style="margin:0 2px 16px 0"
          class="dj-list-item"
          v-for="(item, index) in djs"
          :key="index"
          @click="goDjDetail(item.id)"
        >
          <div class="img-box">
            <img
              v-lazy="item.picUrl + '?param=200y200'"
              width="100%"
              alt="img"
            />
          </div>
          <p class="dj-list-title">{{ item.name }}</p>
        </a-col>
      </a-row>
    </a-skeleton>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getDjRecommend } from '@/api/dj';
import { IDjRadios, IPageJumpConfig } from '@/utils/types';
@Component({
  components: {}
})
export default class DjRecommend extends Vue {
  name = '';
  djs: IDjRadios[] = [];
  loading = true;
  private async mounted() {
    await this.getDjRecommend();
    this.loading = false;
  }
  async getDjRecommend() {
    const res = await getDjRecommend();
    this.name = res.data.name;
    this.djs = res.data.djRadios;
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
