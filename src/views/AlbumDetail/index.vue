<template>
  <div class="album-detail-container">
    <a-row>
      <a-col :span="14" :offset="5">
        <spin v-if="loading"></spin>
        <a-skeleton active :loading="loading">
          <div class="album-detail">
            <a-row>
              <a-col :span="5">
                <img
                  v-lazy="album.cover + '?param=200y200'"
                  style="margin-top:30px;"
                  width="100%"
                  alt="专辑"
                />
              </a-col>
              <a-col :span="18" :offset="1" style="margin-top:26px;">
                <svg
                  class="icon"
                  aria-hidden="true"
                  style="font-size:46px; margin-right:16px;"
                >
                  <use xlink:href="#icon-zhuanji" />
                </svg>
                <h1>{{ album.name }}</h1>
                <div :class="!expand ? 'album-detail-info' : ''">
                  <p>
                    歌手：
                    <span v-for="(art, idx) in album.artists" :key="idx">
                      {{ art }}
                      <span v-if="idx !== album.artists.length - 1">/</span>
                    </span>
                    <a-button @click="addMusicList" class="add-playlist-btn">
                      <svg
                        class="icon"
                        aria-hidden="true"
                        style="font-size:16px; margin-right:16px;"
                      >
                        <use xlink:href="#icon-play1" />
                      </svg>
                      加入播放列表
                    </a-button>
                  </p>
                  <button class="more" @click="showMore">
                    {{ expandText }}
                  </button>
                  <p>发行时间：{{ album.publishTime }}</p>
                  <p>发行公司：{{ album.company }}</p>
                  <div>
                    介绍：
                    <pre style="white-space: pre-wrap;">{{
                      album.description
                    }}</pre>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-skeleton>

        <playlist-table
          :tracks="album.tracks"
          :loading="loading"
        ></playlist-table>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getAlbum } from '@/api/album';
import { IAlbumFormat } from '@/utils/types/index.ts';
import { transformAlbumFormat } from '@/utils/TransformAlbumFormat';
import Bus from '@/utils/Bus';
import PlaylistTable from '@/components/PlaylistTable/index.vue';
import Spin from '@/components/Spin/index.vue';
@Component({
  components: { PlaylistTable, Spin }
})
export default class AblumDetail extends Vue {
  album: IAlbumFormat = {
    id: 0,
    name: '',
    company: '',
    cover: '',
    description: '',
    publishTime: '',
    artists: [],
    tracks: []
  };
  loading = true;
  expand = false;
  expandText = '展开';

  private async mounted() {
    const res = await getAlbum(Number(this.$route.query.id));
    this.album = await transformAlbumFormat(res.data.songs, res.data.album);
    this.loading = false;
  }

  showMore() {
    if (this.expand) {
      this.expand = false;
      this.expandText = '展开';
    } else {
      this.expand = true;
      this.expandText = '收起';
    }
  }

  addMusicList() {
    Bus.$emit('add', this.album.tracks);
    this.$message.success('已加入播放列表！');
  }
}
</script>
<style lang="scss" scoped>
.album-detail-container {
  position: relative;
  padding-bottom: 120px;
  font-size: 14px;
}
.album-detail {
  text-align: left;
  margin-top: 16px;
  padding-bottom: 30px;
  h1 {
    font-size: 24px;
    margin: 16px 0;
    display: inline;
    position: relative;
    top: -8px;
  }
  .add-playlist-btn {
    margin-left: 100px;
  }
  .album-detail-info {
    height: 210px;
    overflow: hidden;
  }
}
.more {
  position: absolute;
  bottom: -16px;
  right: 0;
  font-size: 14px;
  line-height: 2.5em;
  outline: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
}
</style>
