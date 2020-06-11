<template>
  <div class="">
    <a-row>
      <a-col :span="14" :offset="5" class="artist-detail">
        <spin v-if="loading"></spin>
        <a-skeleton active :loading="loading">
          <div>
            <a-row>
              <a-col :span="5">
                <div class="artist-detail-pic-box">
                  <div class="img-box">
                    <img
                      v-lazy="artist.img1v1Url + '?param=200y200'"
                      width="100%"
                      alt="artist"
                    />
                  </div>
                </div>
              </a-col>
              <a-col span="18" :offset="1">
                <div>
                  <svg
                    class="icon"
                    aria-hidden="true"
                    style="font-size:100px; margin: -26px 26px 0 0;"
                  >
                    <use xlink:href="#icon-singer-copy" />
                  </svg>
                  <h3>{{ artist.name }}</h3>
                  <p>
                    <svg
                      class="icon"
                      aria-hidden="true"
                      style="font-size:16px; margin-right:16px;"
                    >
                      <use xlink:href="#icon-song" />
                    </svg>
                    单曲数：{{ artist.musicSize }}
                  </p>
                  <p>
                    <svg
                      class="icon"
                      aria-hidden="true"
                      style="font-size:16px; margin-right:16px;"
                    >
                      <use xlink:href="#icon-album" />
                    </svg>
                    专辑数：{{ artist.albumSize }}
                  </p>
                  <p>
                    <svg
                      class="icon"
                      aria-hidden="true"
                      style="font-size:16px; margin-right:16px;"
                    >
                      <use xlink:href="#icon-mv" />
                    </svg>
                    mv数：{{ artist.mvSize }}
                  </p>
                </div>
              </a-col>
            </a-row>

            <a-row type="flex" justify="space-between" class="tab-option">
              <a-col
                :span="5"
                class="tab-option-item"
                :class="tabIndex === 1 ? 'tab-option-item-active' : ''"
                @click="clickTab(1)"
              >
                热门单曲(TOP50)
              </a-col>
              <a-col
                :span="5"
                class="tab-option-item"
                :class="tabIndex === 2 ? 'tab-option-item-active' : ''"
                @click="clickTab(2)"
              >
                所有专辑
              </a-col>
              <a-col
                :span="5"
                class="tab-option-item"
                :class="tabIndex === 3 ? 'tab-option-item-active' : ''"
                @click="clickTab(3)"
              >
                MV
              </a-col>
              <a-col
                :span="5"
                class="tab-option-item"
                :class="tabIndex === 4 ? 'tab-option-item-active' : ''"
                @click="clickTab(4)"
              >
                艺人介绍
              </a-col>
            </a-row>
            <a-row style="margin-top:16px">
              <a-col span="24">
                <artist-hot-song
                  v-if="tabIndex === 1"
                  :hot-songs="hotSongs"
                  :loading="loading"
                ></artist-hot-song>
                <artist-album
                  v-if="tabIndex === 2"
                  :album-size="artist.albumSize"
                ></artist-album>
                <artist-mv v-if="tabIndex === 3"></artist-mv>
                <artist-description
                  v-if="tabIndex === 4"
                  :artist-name="artist.name"
                ></artist-description>
              </a-col>
            </a-row>
          </div>
        </a-skeleton>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getArtist } from '@/api/artist';
import { getSongDetail } from '@/api/song.ts';
import { IArtist, ISongFormat } from '@/utils/types';
import { transformTracks } from '@/utils/TransformPlaylistFormat';
import ArtistAlbum from './components/ArtistAlbum.vue';
import ArtistDescription from './components/ArtistDescription.vue';
import ArtistHotSong from './components/ArtistHotSong.vue';
import ArtistMv from './components/ArtistMv.vue';
import Spin from '@/components/Spin/index.vue';
@Component({
  components: { ArtistAlbum, ArtistDescription, ArtistHotSong, ArtistMv, Spin }
})
export default class ArtistDetail extends Vue {
  loading = true;
  tabIndex = 1;
  artist: IArtist = {
    id: 0,
    name: '',
    mvSize: 0,
    albumSize: 0,
    musicSize: 0,
    img1v1Url: '',
    briefDesc: ''
  };
  hotSongs: ISongFormat[] = [];

  @Watch('$route', { deep: true })
  async reset(to: any, from: any) {
    this.loading = true;
    await this.getArtist();
    this.loading = false;
  }
  private async mounted() {
    await this.getArtist();
    this.loading = false;
  }

  async getArtist() {
    const res = await getArtist(Number(this.$route.query.id));
    this.artist = res.data.artist;
    const trackIds = res.data.hotSongs.map(song => {
      return song.id;
    });
    const tracks: ISongFormat[] = await transformTracks(trackIds);
    this.hotSongs = tracks;
  }

  clickTab(idx: number) {
    if (idx !== this.tabIndex) {
      this.tabIndex = idx;
    }
  }
}
</script>
<style lang="less" scoped>
.artist-detail {
  padding: 16px 16px 100px 16px;
  margin-top: 16px;
  text-align: left;
  font-size: 14px;
  h3 {
    display: inline;
    font-size: 24px;
    position: relative;
    top: -24px;
  }
  .artist-detail-pic-box {
    margin-top: 6px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .tab-option {
    border-bottom: 1px solid #ccc;
    margin-top: 16px;
    .tab-option-item {
      font-size: 16px;
      line-height: 2em;
      text-align: center;
      cursor: pointer;
    }
    .tab-option-item-active {
      border-bottom: 2px solid #d81e06;
    }
  }
}
</style>
