<template>
  <a-skeleton active :loading="loading">
    <div class="recommend-item">
      <div>
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size:16px;margin-right:16px;"
        >
          <use xlink:href="#icon-circle" />
        </svg>
        最新音乐
      </div>
      <a-row type="flex" justify="space-around">
        <a-col
          :span="12"
          v-for="(item, index) in personalizedNewSong"
          :key="index"
        >
          <a-row type="flex" justify="start" class="recommend-new-songs">
            <a-col :span="3" style="position:relative;">
              <div @click.once="addMusic(item)">
                <svg
                  class="icon play"
                  aria-hidden="true"
                  style="font-size:16px; margin-right:16px;"
                >
                  <use xlink:href="#icon-play" />
                </svg>
                <img
                  v-lazy="item.cover + '?param=50y50'"
                  width="100%"
                  alt="img"
                  style="margin:9px 0 0 9px;cursor: pointer;z-index:-1"
                />
              </div>
            </a-col>
            <a-col :span="18" :offset="1">
              <p
                class="common--title"
                style="line-height:1.5em;cursor:pointer"
                @click="goSongDetail(item.id)"
              >
                {{ item.name }}
              </p>
              <span
                class="common--title"
                style="line-height:1.5em;cursor:pointer;color:#999"
                v-for="(ar, idx) in item.artists"
                :key="idx"
                @click="goArtistDetail(item.artistId[idx])"
              >
                {{ ar }}
                <span v-show="idx !== item.artists.length - 1">/</span>
              </span>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getPersonalizedNewSong } from '@/api/home.ts';
import { ISongFormat, ResponsePersonalizedNewSong } from '@/utils/types';
import { namespace } from 'vuex-class';
import { transformPlayList } from '@/utils/TransformNewSongFormat.ts';
import PageJump from '@/utils/PageJump.ts';
const playlistModule = namespace('playlist');
import Bus from '@/utils/Bus';
@Component({
  components: {}
})
export default class RecommendNewSong extends Vue {
  loading = true;
  personalizedNewSong: ISongFormat[] = [];

  @playlistModule.Action('SET_CURRENT_MUSIC_ACTION')
  SET_CURRENT_MUSIC_ACTION!: Function;

  private async mounted() {
    const res = await getPersonalizedNewSong();
    this.personalizedNewSong = transformPlayList(res.data.result as []);
    this.loading = false;
  }
  private addMusic(song: ISongFormat) {
    this.SET_CURRENT_MUSIC_ACTION(song).then((result: ISongFormat) => {
      Bus.$emit('play', result);
    });
  }
  private goSongDetail(id: number) {
    PageJump.pageJump({
      that: this,
      id: id,
      path: '/songDetail'
    });
  }
  private goArtistDetail(id: number) {
    PageJump.pageJump({
      that: this,
      id: id,
      path: '/artistDetail'
    });
  }
}
</script>
