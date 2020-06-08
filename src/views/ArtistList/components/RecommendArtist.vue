<template>
  <div class="artist">
    <a-skeleton active :loading="loading">
      <div class="artist-list">
        <p class="artist-list-top-title">
          <svg
            class="icon"
            aria-hidden="true"
            style="font-size:16px; margin-right:16px;"
          >
            <use xlink:href="#icon-circle" />
          </svg>
          入驻歌手
        </p>
        <a-row type="flex" justify="space-around">
          <a-col
            :span="4"
            style="margin:0 2px 16px 0"
            class="artist-list-item"
            v-for="(item, index) in residentSinger"
            :key="index"
          >
            <div class="img-box">
              <img
                v-lazy="item.img1v1Url + '?param=200y200'"
                width="100%"
                alt="img"
                @click="goArtistDetail(item.id)"
              />
            </div>
            <p class="artist-list-title">{{ item.name }}</p>
          </a-col>
        </a-row>
      </div>
    </a-skeleton>

    <a-skeleton active :loading="loading">
      <div class="artist-list">
        <p class="artist-list-top-title">
          <svg
            class="icon"
            aria-hidden="true"
            style="font-size:16px; margin-right:16px;"
          >
            <use xlink:href="#icon-circle" />
          </svg>
          热门歌手
        </p>
        <a-row type="flex" justify="space-around">
          <a-col
            :span="4"
            style="margin:0 2px 16px 0"
            class="artist-list-item"
            v-for="(item, index) in hotSinger"
            :key="index"
          >
            <div class="img-box">
              <img
                v-lazy="item.img1v1Url + '?param=200y200'"
                width="100%"
                alt="img"
                @click="goArtistDetail(item.id)"
              />
            </div>
            <p class="artist-list-title">{{ item.name }}</p>
          </a-col>
        </a-row>
      </div>
    </a-skeleton>
  </div>
</template>

<script lang="ts">
import { ArtistByCategoryParams, IArtistByCategory } from '@/utils/types';
import { Component, Vue } from 'vue-property-decorator';
import { getArtistByCategory, getTopArtists } from '@/api/artist';
import PageJump from '@/utils/PageJump';
@Component({
  components: {}
})
export default class extends Vue {
  residentSinger: IArtistByCategory[] = [];
  hotSinger: IArtistByCategory[] = [];
  loading = true;
  private async mounted() {
    await this.getResidentSinger();
    await this.getHotSinger();
    this.loading = false;
  }

  async getResidentSinger() {
    const res = await getArtistByCategory({ cat: 5001, limit: 10, offset: 0 });
    this.residentSinger = res.data.artists;
  }

  async getHotSinger() {
    const res = await getTopArtists({ limit: 20, offset: 0 });
    this.hotSinger = res.data.artists;
  }

  goArtistDetail(id: number) {
    PageJump.pageJump({
      that: this,
      path: '/artistDetail',
      id
    });
  }
}
</script>
<style lang="scss" scoped>
.artist {
  padding: 36px 16px 100px 16px;
  & .artist-list {
    font-size: 16px;
    .artist-list-top-title {
      text-align: left;
      width: 100%;
      font-size: 24px;
      line-height: 1.5em;
      border-bottom: 1px solid #dddddd;
      margin-bottom: 16px;
    }
  }
  & .artist-list-title {
    font-size: 14px;
    cursor: pointer;
    line-height: 1.5em;
  }
}
</style>
