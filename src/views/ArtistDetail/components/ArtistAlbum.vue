<template>
  <a-skeleton active :loading="loading">
    <div class="album-list">
      <a-row type="flex" justify="start">
        <a-col
          :span="5"
          style="margin:16px"
          class="album-list-item"
          v-for="(item, index) in albums"
          :key="index"
        >
          <div class="img-box">
            <img
              v-lazy="item.picUrl + '?param=200y200'"
              width="100%"
              alt="img"
              style="cursor:pointer"
              @click="goAlbumDetail(item.id)"
            />
          </div>
          <p class="album-list-title">{{ item.name }}</p>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around">
        <a-col>
          <a-pagination
            @change="onChangePage"
            :current="currentPage"
            :total="albumSize"
            :default-page-size="20"
            style="margin-top:10px"
          />
        </a-col>
      </a-row>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getArtistAlbum } from '@/api/artist';
import { IAlbum } from '@/utils/types';
import PageJump from '@/utils/PageJump';
@Component({
  components: {}
})
export default class ArtistAlbum extends Vue {
  @Prop({ required: true })
  albumSize: number | undefined;

  currentPage = 1;
  loading = true;
  albums: IAlbum[] = [];

  private async mounted() {
    await this.getAlbums();
  }

  async getAlbums() {
    this.loading = true;
    const res = await getArtistAlbum({
      id: Number(this.$route.query.id),
      limit: 20,
      offset: (this.currentPage - 1) * 20
    });
    this.albums = res.data.hotAlbums;
    this.loading = false;
  }

  async onChangePage(cur: number) {
    this.currentPage = cur;
    await this.getAlbums();
  }

  goAlbumDetail(id: number) {
    PageJump.pageJump({
      that: this,
      path: '/albumDetail',
      id
    });
  }
}
</script>
