<template>
  <a-skeleton active :loading="loading">
    <div class="recommend-item">
      <div>
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size:16px;margin-right:16px;"
        >
          <use xlink:href="#icon-circle" />
        </svg>
        推荐MV
      </div>
      <a-row type="flex" justify="space-around" style="padding: 14px 0 0 0">
        <a-col
          :span="5"
          v-for="(item, index) in personalizedMv"
          :key="index"
          style="margin-bottom: 16px"
        >
          <img
            v-lazy="item.picUrl + '?imageView&quality=70'"
            alt="img"
            width="100%"
            style="cursor: pointer;"
            @click="goMvDetail(item.id)"
          />
          <p class="common--title" @click="goMvDetail(item.id)">
            {{ item.name }}
          </p>
        </a-col>
      </a-row>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getPersonalizedMv } from '@/api/home.ts';
import { IPageJumpConfig, IPersonalizedMv } from '@/utils/types';
@Component({
  components: {}
})
export default class RecommendMv extends Vue {
  loading = true;
  personalizedMv: IPersonalizedMv[] = [];
  private async mounted() {
    const res = await getPersonalizedMv<IPersonalizedMv[]>();
    this.personalizedMv = res.data.result;
    this.loading = false;
  }
  private goMvDetail(id: number) {
    this.pageJump({
      id: id,
      path: '/mv'
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
