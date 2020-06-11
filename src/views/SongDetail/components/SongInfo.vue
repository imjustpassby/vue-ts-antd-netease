<template>
  <div class="song-detail">
    <a-row>
      <a-col :span="5">
        <div class="img-box">
          <img v-lazy="songInfo.cover" class="album-cover" alt="歌曲" />
        </div>
      </a-col>
      <a-col :span="18" :offset="1">
        <div style="margin-top:46px">
          <svg
            class="icon"
            aria-hidden="true"
            style="font-size:46px; margin-right:16px;"
          >
            <use xlink:href="#icon-song-red" />
          </svg>
          <h1>{{ songInfo.name }}</h1>
        </div>

        <div class="song-artist">
          <span style="cursor:pointer">
            歌手：
            <span
              style="cursor:pointer"
              v-for="(ar, idx) in songInfo.artists"
              :key="idx"
              @click="goArtistDetail(songInfo.artistId[idx])"
            >
              {{ ar }}
              <span v-show="idx !== songInfo.artists.length - 1">/</span>
            </span>
          </span>
          <a-button @click.once="playMusic(songInfo)" style="margin-left: 20px">
            <svg
              class="icon"
              aria-hidden="true"
              style="font-size:16px; margin-right:16px;"
            >
              <use xlink:href="#icon-play1" />
            </svg>
            播放
          </a-button>
          <a-button @click.once="addMusic(songInfo)" style="margin-left: 20px">
            <svg
              class="icon"
              aria-hidden="true"
              style="font-size:16px; margin-right:16px;"
            >
              <use xlink:href="#icon-add" />
            </svg>
            添加到列表
          </a-button>
        </div>
        <div :class="!expand ? 'album-detail-info' : ''">
          <div>
            <span style="cursor:pointer" @click="goAlbumDetail">
              专辑：{{ songInfo.albumName }}
            </span>
            <button class="more" @click="showMore">{{ expandText }}</button>
          </div>
          <br />
          <p>歌词：</p>
          <pre>{{ lyric }}</pre>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getLyric, getSongDetail } from '@/api/song';
import { IPageJumpConfig, ISongFormat } from '@/utils/types';
import { namespace } from 'vuex-class';
import { TransformTracksSongFormat } from '@/utils/TransformPlaylistFormat';
import Bus from '@/utils/Bus';
const playlistModule = namespace('playlist');
@Component({
  components: {}
})
export default class SongInfo extends Vue {
  songInfo: ISongFormat = {
    id: 0,
    cover: '',
    name: '',
    artist: '',
    artists: [],
    artistId: [],
    albumName: '',
    albumId: 0,
    theme: [255, 255, 255],
    songType: 'song',
    key: 0,
    pop: 0,
    duration: ''
  };
  lyric = '';
  expand = false;
  expandText = '展开';

  @Watch('$route', { deep: true })
  async reset(to: any, from: any) {
    await this.getSongInfo();
    await this.getLyric();
  }

  @playlistModule.Action('SET_CURRENT_MUSIC_ACTION')
  SET_CURRENT_MUSIC_ACTION!: Function;

  private async mounted() {
    await this.getSongInfo();
    await this.getLyric();
  }

  async getSongInfo() {
    const res = await getSongDetail(this.$route.query.id as string);
    this.songInfo = await TransformTracksSongFormat(res.data.songs[0]);
  }

  async getLyric() {
    const res = await getLyric(Number(this.$route.query.id));
    if (res.data.lrc !== undefined) {
      this.lyric = res.data.lrc.lyric.replace(/[\[d{2}:d{2}\.\d{3}\]]/g, '');
    }
  }

  goArtistDetail(id: number) {
    this.pageJump({
      path: '/artistDetail',
      id
    });
  }

  goAlbumDetail() {
    this.pageJump({
      path: '/albumDetail',
      id: this.songInfo.albumId
    });
  }

  playMusic(song: ISongFormat) {
    this.SET_CURRENT_MUSIC_ACTION(song).then((result: ISongFormat) => {
      Bus.$emit('play', result);
    });
  }

  addMusic(song: ISongFormat) {
    Bus.$emit('add', [song]);
    this.$message.success('已加入播放列表！');
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
<style lang="less" scoped>
.song-detail {
  font-size: 14px;
  text-align: left;
  margin-top: 16px;
  .album-cover {
    width: 100%;
    height: 100%;
    margin-top: 30px;
    border-radius: 50%;
    cursor: auto;
  }
  h1 {
    font-size: 24px;
    display: inline;
    position: relative;
    top: -10px;
  }
  .song-artist {
    font-size: 14px;
    line-height: 3em;
    height: 40px;
    margin: 16px 0;
  }
}
.album-detail-info {
  height: 120px;
  overflow: hidden;
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
  color: blueviolet;
  background-color: rgba(255, 255, 255, 0);
}
</style>
