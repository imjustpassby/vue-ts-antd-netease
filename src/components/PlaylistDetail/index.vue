<template>
  <div class="playlist-detail-container">
    <a-row>
      <a-col :span="14" :offset="5">
        <a-skeleton active :loading="loading">
          <div class="playlist-detail">
            <a-row>
              <a-col :span="5">
                <div class="img-box">
                  <img
                    v-lazy="playlist.cover + '?param=200y200'"
                    style="margin-top:30px"
                    width="100%"
                    alt="歌单"
                  />
                </div>
              </a-col>
              <a-col :span="18" :offset="1">
                <svg
                  class="icon"
                  aria-hidden="true"
                  style="font-size:100px; margin-right:16px;"
                >
                  <use xlink:href="#icon-qukugedan" />
                </svg>
                <h1>{{ playlist.name }}</h1>
                <div class="playlist-creator">
                  <img
                    v-lazy="playlist.creator.avatarUrl + '?param=50y50'"
                    width="36px"
                    alt
                  />
                  <span>
                    {{ playlist.creator.nickname }}&nbsp;&nbsp;于&nbsp;&nbsp;{{
                      playlist.createTime
                    }}&nbsp;&nbsp;创建
                  </span>
                </div>
                <div>
                  <a-button
                    @click.once="addMusicList"
                    style="margin-right: 20px"
                  >
                    <svg
                      class="icon"
                      aria-hidden="true"
                      style="font-size:16px; margin-right:16px;"
                    >
                      <use xlink:href="#icon-play1" />
                    </svg>
                    加入播放列表
                  </a-button>
                  <a-button
                    @click.once="subscribe(playlist.id)"
                    style="margin-right: 20px"
                  >
                    <svg
                      class="icon"
                      aria-hidden="true"
                      style="font-size:16px; margin-right:16px;"
                    >
                      <use xlink:href="#icon-like2" />
                    </svg>
                    收藏歌单
                  </a-button>
                </div>
                <div class="tag" v-if="playlist.tags.length">
                  <span>标签：</span>
                  <a-tag
                    color="pink"
                    v-for="(tag, idx) in playlist.tags"
                    :key="idx"
                  >
                    {{ tag }}
                  </a-tag>
                </div>
                <div class="description">
                  介绍：
                  <p>{{ playlist.description }}</p>
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="album-tracks"></div>
        </a-skeleton>

        <a-skeleton active :loading="loading">
          <div>
            <div class="list-title">
              <span style="font-size:24px">歌曲列表</span>
              <span>共{{ playlist.tracks.length }}首</span>
            </div>
            <a-table :data-source="playlist.tracks">
              <a-table-column title align="center" key="action" width="10%">
                <template slot-scope="text, record">
                  <span>
                    <svg
                      class="icon play-icon"
                      aria-hidden="true"
                      @click.once="playMusic(record)"
                    >
                      <use xlink:href="#icon-play1" />
                    </svg>
                    <svg
                      class="icon play-icon"
                      aria-hidden="true"
                      @click.once="addMusic(record)"
                    >
                      <use xlink:href="#icon-add" />
                    </svg>
                  </span>
                </template>
              </a-table-column>
              <a-table-column title="歌曲标题" width="40%" key="title">
                <template slot-scope="text, record">
                  <a-popover placement="top">
                    <template slot="content">
                      <span>{{ record.name }}</span>
                    </template>
                    <span @click="goSongDetail(record)" style="cursor:pointer">
                      {{ record.name }}
                    </span>
                  </a-popover>
                </template>
              </a-table-column>
              <a-table-column
                title="歌手"
                align="center"
                width="25%"
                key="artist"
              >
                <template slot-scope="text, record">
                  <a-popover placement="top">
                    <template slot="content">
                      <span
                        style="cursor:pointer"
                        v-for="(ar, idx) in record.artists"
                        :key="idx"
                        @click="goArtistDetail(record.artistId[idx])"
                      >
                        {{ ar }}
                        <span v-show="idx !== record.artists.length - 1">
                          /
                        </span>
                      </span>
                    </template>
                    <span>{{ record.artist }}</span>
                  </a-popover>
                </template>
              </a-table-column>
              <a-table-column title="专辑" key="albumName">
                <template slot-scope="text, record">
                  <a-popover placement="top">
                    <template slot="content">
                      <span>{{ record.albumName }}</span>
                    </template>
                    <span @click="goAlbumDetail(record)" style="cursor:pointer">
                      {{ record.albumName }}
                    </span>
                  </a-popover>
                </template>
              </a-table-column>
            </a-table>
          </div>
        </a-skeleton>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IPlaylistFormat, ISongFormat } from '@/utils/types/index.ts';
import PageJump from '@/utils/PageJump.ts';
@Component({
  components: {}
})
export default class PlaylistDetailComponent extends Vue {
  @Prop({ required: true })
  playlist: IPlaylistFormat | undefined;

  @Prop({ required: true })
  loading: boolean | undefined;

  addMusicList() {
    this.$message.success('已加入播放列表！');
  }

  subscribe() {
    this.$message.success('收藏成功！');
  }

  goSongDetail(id: number) {
    PageJump.pageJump({
      that: this,
      path: '/songDetail',
      id: id
    });
  }

  addMusic(song: ISongFormat) {
    this.$message.success('已加入播放列表！');
  }

  goArtistDetail(id: number) {
    PageJump.pageJump({
      that: this,
      path: '/artistDetail',
      id: id
    });
  }

  goAlbumDetail(id: number) {
    PageJump.pageJump({
      that: this,
      path: '/albumDetail',
      id: id
    });
  }
}
</script>
<style lang="scss" scoped>
.playlist-detail-container {
  padding-bottom: 100px;
  font-size: 14px;
  .play-icon {
    font-size: 20px;
    cursor: pointer;
  }
  .list-title {
    text-align: left;
    margin-bottom: 10px;
    & > span {
      margin: 10px;
    }
  }
}
.playlist-detail {
  text-align: left;
  margin-top: 16px;
  padding-bottom: 30px;
  min-height: 300px;
  h1 {
    font-size: 24px;
    display: inline;
    position: relative;
    top: -26px;
  }
  .playlist-creator {
    font-size: 14px;
    line-height: 3em;
    height: 40px;
    margin: -16px 0 16px 0;
    img {
      margin-right: 16px;
      float: left;
      clear: both;
      border-radius: 50%;
    }
  }
  .tag {
    font-size: 14px;
    margin: 14px 0;
  }
  .description {
    margin-top: 14px;
  }
}
</style>
