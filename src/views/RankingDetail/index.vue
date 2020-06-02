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
                    v-lazy="playList.cover + '?param=200y200'"
                    width="100%"
                    alt="歌单"
                  />
                </div>
              </a-col>
              <a-col :span="18" :offset="1">
                <svg
                  class="icon"
                  aria-hidden="true"
                  style="font-size:36px; margin-right:16px;"
                >
                  <use xlink:href="#icon-paihangbang" />
                </svg>
                <h1>{{ playList.name }}</h1>
                <div class="playlist-creator">
                  <img
                    v-lazy="playList.creator.avatarUrl + '?param=50y50'"
                    width="36px"
                    alt
                  />
                  <span>
                    {{
                      playList.creator.nickname
                    }}&nbsp;&nbsp;最近更新&nbsp;&nbsp;{{ playList.updateTime }}
                  </span>
                  <a-button
                    @click.once="addMusicList"
                    style="margin-left: 20px"
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
                </div>
                <div>
                  介绍：
                  <p>{{ playList.description }}</p>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-skeleton>

        <a-skeleton active :loading="loading">
          <div>
            <div class="list-title">
              <span style="font-size:24px">歌曲列表</span>
              <span>共{{ playList.tracks.length }}首</span>
            </div>
            <a-table :data-source="playList.tracks">
              <a-table-column title key="action" width="10%">
                <template slot-scope="text, record">
                  <span>
                    <svg class="icon play-icon" @click.once="addMusic(record)">
                      <use xlink:href="#icon-play1" />
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
              <a-table-column title="歌手" width="25%" key="artist">
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
                        <em v-show="idx !== record.artists.length - 1">/</em>
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
import { Component, Vue } from 'vue-property-decorator';
import { IPlaylistFormat } from '@/utils/types/index.ts';
import { transformResponseRankingPlaylist } from '@/utils/transformPlaylistFormat.ts';
import Ranking from '@/api/ranking.ts';
@Component({
  components: {}
})
export default class RankingDetail extends Vue {
  loading = true;
  playList: IPlaylistFormat = {
    id: 0,
    creator: '',
    name: '',
    cover: '',
    updateTime: '',
    description: '',
    trackIds: [],
    tracks: [],
    tags: []
  };

  get idx() {
    return this.$route.query.id;
  }

  private async mounted() {
    const res = await Ranking.getRankingDetail(this.idx as string);
    this.playList = transformResponseRankingPlaylist(res.data.playlist);
    this.loading = false;
  }
}
</script>
<style lang="scss" scoped>
.playlist-detail-container {
  padding-bottom: 100px;
  text-align: left;
  font-size: 14px;
  .play-icon {
    margin-left: 40%;
    font-size: 24px;
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
  margin-top: 46px;
  padding-bottom: 100px;
  h1 {
    font-size: 24px;
    display: inline;
    position: relative;
    top: -4px;
  }
  .playlist-creator {
    font-size: 14px;
    line-height: 3em;
    height: 40px;
    margin: 16px 0;
    img {
      margin-right: 16px;
      float: left;
      clear: both;
      border-radius: 50%;
    }
  }
}
</style>
