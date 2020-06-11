<template>
  <div class="album-list">
    <div class="album-list-top-title">
      <svg
        class="icon"
        aria-hidden="true"
        style="font-size:16px; margin-right:16px;"
      >
        <use xlink:href="#icon-circle" />
      </svg>
      最新专辑
    </div>
    <a-skeleton active :loading="loading">
      <a-row type="flex" justify="space-around">
        <a-col
          :span="5"
          style="margin:16px"
          class="album-list-item"
          v-for="(item, index) in albums"
          :key="index"
          @click="goAlbumDetail(item.id)"
        >
          <div class="img-box">
            <img
              v-lazy="item.picUrl + '?param=200y200'"
              width="100%"
              alt="img"
            />
          </div>
          <p class="album-list-title">{{ item.name }}</p>
        </a-col>
      </a-row>
    </a-skeleton>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getNewestAlbum } from '@/api/album';
import { IAlbum, IPageJumpConfig } from '@/utils/types';
@Component({
  components: {}
})
export default class NewestAlbumComponent extends Vue {
  albums: IAlbum[] = [];
  loading = true;

  private async mounted() {
    await this.getAlbums();
  }

  async getAlbums() {
    const res = await getNewestAlbum();
    this.albums = res.data.albums;
    this.loading = false;
  }

  goAlbumDetail(id: number) {
    this.pageJump({
      path: '/albumDetail',
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
<style lang="less" scoped></style>
