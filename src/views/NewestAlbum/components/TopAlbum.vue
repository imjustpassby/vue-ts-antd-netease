<template>
  <div>
    <div class="album-list">
      <div class="album-list-top-title">
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size:16px; margin-right:16px;"
        >
          <use xlink:href="#icon-circle" />
        </svg>
        全部新碟
      </div>
      <a-skeleton active :loading="loading">
        <a-row type="flex" justify="space-around">
          <a-col
            :span="5"
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

    <a-pagination
      @change="onChangePage"
      :current="currentPage"
      :total="50"
      style="margin-top:20px"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getTopAlbum } from '@/api/album';
import { IAlbum, TopAlbumParams } from '@/utils/types';
import PageJump from '@/utils/PageJump';
@Component({
  components: {}
})
export default class NewestAlbumComponent extends Vue {
  albums: IAlbum[] = [];
  loading = true;
  currentPage = 1;

  private async mounted() {
    await this.getAlbums({ limit: 20, offset: 0 });
  }

  async getAlbums({ limit = 20, offset }: TopAlbumParams) {
    const res = await getTopAlbum({ limit, offset });
    this.albums = res.data.albums;
    this.loading = false;
  }

  goAlbumDetail(id: number) {
    PageJump.pageJump({
      that: this,
      path: '/albumDetail',
      id
    });
  }

  async onChangePage(cur: number) {
    this.currentPage = cur;
    await this.getAlbums({ limit: 20, offset: (this.currentPage - 1) * 20 });
  }
}
</script>
<style lang="scss" scoped></style>
