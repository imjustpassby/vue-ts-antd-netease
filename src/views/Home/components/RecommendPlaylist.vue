<template>
  <a-skeleton active :loading="loading">
    <div class="recommend-item" style="min-height: 50vh">
      <div>
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size:16px; margin-right:16px;"
        >
          <use xlink:href="#icon-circle" />
        </svg>
        推荐歌单
      </div>
      <a-row
        type="flex"
        justify="space-between"
        style="padding: 14px 0 0 0;overflow:hidden;"
      >
        <a-col
          :span="4"
          v-for="(item, index) in personalizedPlaylist"
          :key="index"
          style="margin:0 2px 16px 0;"
          @click="goPlaylistDetail(item)"
        >
          <div class="img-box">
            <img v-lazy="item.picUrl + '?param=200y200'" alt="img" />
          </div>
          <div style="height:46px;overflow:hidden">
            <p class="common--title">{{ item.name }}</p>
          </div>
        </a-col>
      </a-row>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getPersonalizedPlaylist } from '@/api/home.ts';
import { IPageJumpConfig, IPersonalizedPlaylist } from '@/utils/types';
@Component({
  components: {}
})
export default class RecommendPlaylist extends Vue {
  personalizedPlaylist: IPersonalizedPlaylist[] = [];
  loading = true;

  private async mounted() {
    const res = await getPersonalizedPlaylist<IPersonalizedPlaylist[]>();
    this.personalizedPlaylist = res.data.result;
    this.loading = false;
  }

  private goPlaylistDetail(item: IPersonalizedPlaylist) {
    this.pageJump({
      id: item.id,
      path: '/playlistDetail'
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
