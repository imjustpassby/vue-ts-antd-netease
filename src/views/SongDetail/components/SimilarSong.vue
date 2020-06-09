<template>
  <div style="padding-top: 36px">
    <a-row>
      <a-col>
        <p class="title">相似歌曲</p>
        <hr />
        <a-list item-layout="horizontal" :data-source="tracks" :locale="locale">
          <a-list-item
            slot="renderItem"
            slot-scope="item, index"
            style="padding-left: 6px;text-align:left;"
          >
            <a-list-item-meta
              :description="item.artist + '--' + item.albumName"
              :key="index"
            >
              <p slot="title">{{ item.name }}</p>
              <a-avatar
                slot="avatar"
                class="cover-img"
                :src="item.cover"
                @click="goSongDetail(item.id)"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
      <a-col style="margin-top: 30px" v-if="playlist.length > 0">
        <p class="title">包含这首歌的歌单</p>
        <hr />
        <a-list
          item-layout="horizontal"
          :data-source="playlist"
          :locale="locale"
        >
          <a-list-item
            slot="renderItem"
            slot-scope="item, index"
            style="padding-left: 6px;text-align:left;"
          >
            <a-list-item-meta
              :description="'播放 ' + item.playCount"
              :key="index"
            >
              <p slot="title">{{ item.name }}</p>
              <a-avatar
                slot="avatar"
                class="cover-img"
                :src="item.coverImgUrl + '?param=50y50'"
                @click="goPlaylistDetail(item.id)"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getSimilarPlaylist } from '@/api/playlist';
import { getSimilarSong } from '@/api/song';
import { getSongDetail } from '@/api/song';
import { ISimilarPlaylist, ISongFormat } from '@/utils/types';
import { transformTracks } from '@/utils/TransformPlaylistFormat';
import PageJump from '@/utils/PageJump';
@Component({
  components: {}
})
export default class SimilarSong extends Vue {
  tracks: ISongFormat[] = [];
  playlist: ISimilarPlaylist[] = [];
  locale = { emptyText: '暂无推荐' };

  @Watch('$route', { deep: true })
  async reset(to: any, from: any) {
    await this.getSimilarSong();
    await this.getSimilarPlaylist();
  }

  private async mounted() {
    await this.getSimilarSong();
    await this.getSimilarPlaylist();
  }

  async getSimilarSong() {
    const res = await getSimilarSong(Number(this.$route.query.id));
    const trackIds = res.data.songs.map(item => item.id);
    const resSongDetail = await getSongDetail(trackIds.join(','));
    this.tracks = transformTracks(resSongDetail.data.songs);
  }

  async getSimilarPlaylist() {
    const res = await getSimilarPlaylist(Number(this.$route.query.id));
    this.playlist = res.data.playlists;
  }
  goSongDetail(id: number) {
    PageJump.pageJump({
      that: this,
      path: '/songDetail',
      id
    });
  }

  goPlaylistDetail(id: number) {
    PageJump.pageJump({
      that: this,
      path: '/playlistDetail',
      id
    });
  }
}
</script>
<style lang="scss" scoped>
.cover-img {
  width: 46px;
  height: 46px;
  cursor: pointer;
}
.title {
  text-align: left;
  font-size: 16px;
}
</style>
