<template>
  <div class="">
    <a-row class="ranking-list">
      <a-col :span="14" :offset="5">
        <a-skeleton active :loading="loading">
          <a-row type="flex" justify="start">
            <a-col
              :span="5"
              class="ranking-list-item"
              v-for="(item, index) in rankingList"
              :key="index"
            >
              <div class="img-box">
                <img
                  v-lazy="item.coverImgUrl + '?param=200y200'"
                  width="100%"
                  alt="img"
                  @click="goRankingDetail(item.id)"
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
import { getRankingList } from '@/api/ranking.ts';
import { IRanking } from '@/utils/types/index.ts';
import PageJump from '@/utils/PageJump';
@Component({
  components: {}
})
export default class RankingList extends Vue {
  rankingList: IRanking[] = [];
  loading = true;

  private async mounted() {
    const res = await getRankingList<IRanking[]>();
    this.rankingList = res.data.list;
    this.loading = false;
  }

  private goRankingDetail(id: number) {
    PageJump.pageJump({
      that: this,
      path: '/playlistDetail',
      id: id
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
    margin: 16px;
    img {
      cursor: pointer;
    }
  }
}
</style>
