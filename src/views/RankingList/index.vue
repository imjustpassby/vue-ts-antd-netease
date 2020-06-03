<template>
  <div class="">
    <a-row class="ranking-list">
      <a-col :span="14" :offset="5">
        <a-skeleton active :loading="loading">
          <a-row type="flex" justify="space-around">
            <a-col
              :span="5"
              class="ranking-list-item"
              v-for="(item, index) in rankingList"
              :key="index"
            >
              <div class="img-box">
                <img
                  v-lazy="item.url + '?param=200y200'"
                  width="100%"
                  alt="img"
                  @click="goRankingDetail(index)"
                />
              </div>
              <p class="common--title">{{ item.name }}</p>
            </a-col>
          </a-row>
        </a-skeleton>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getRankingList, IRanking } from '@/api/ranking.ts';
import PageJump from '@/utils/PageJump';
@Component({
  components: {}
})
export default class RankingList extends Vue {
  rankingList: IRanking[] = [];
  loading = true;

  private mounted() {
    this.rankingList = getRankingList();
    this.loading = false;
  }

  private goRankingDetail(idx: number) {
    PageJump.pageJump({
      that: this,
      path: '/rankingDetail',
      id: idx
    });
  }
}
</script>
<style lang="scss" scoped>
.ranking-list {
  font-size: 16px;
  margin-top: 16px;
  padding-bottom: 100px;
  .ranking-list-item {
    margin-top: 16px;
    img {
      cursor: pointer;
    }
  }
}
</style>
