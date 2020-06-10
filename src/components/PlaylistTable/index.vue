<template>
  <a-skeleton active :loading="loading">
    <div>
      <a-table :data-source="tracks" :pagination="pagination">
        <a-table-column title="" align="center" key="action" width="12%">
          <template slot-scope="text, record">
            <span>
              <svg
                class="icon play-icon"
                aria-hidden="true"
                @click="playMusic(record)"
              >
                <use xlink:href="#icon-play1" />
              </svg>
              <svg
                class="icon play-icon"
                aria-hidden="true"
                @click="addMusic(record)"
              >
                <use xlink:href="#icon-add" />
              </svg>
            </span>
          </template>
        </a-table-column>
        <a-table-column title="歌曲标题" width="30%" key="title">
          <template slot-scope="text, record">
            <a-popover placement="top">
              <template slot="content">
                <span>{{ record.name }}</span>
              </template>
              <span @click="goSongDetail(record.id)" style="cursor:pointer">
                {{ record.name }}
              </span>
            </a-popover>
          </template>
        </a-table-column>
        <a-table-column title="歌手" width="20%" key="artist">
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
              <span
                @click="goAlbumDetail(record.albumId)"
                style="cursor:pointer"
              >
                {{ record.albumName }}
              </span>
            </a-popover>
          </template>
        </a-table-column>
        <a-table-column title="热度" width="10%" key="pop" align="center">
          <template slot-scope="text, record">
            <a-progress
              :percent="record.pop"
              :show-info="false"
              size="small"
              status="active"
              stroke-color="red"
              :format="percent => percent"
            />
          </template>
        </a-table-column>
        <a-table-column title="时长" width="10%" key="duration" align="center">
          <template slot-scope="text, record">
            <span>{{ record.duration }}</span>
          </template>
        </a-table-column>
      </a-table>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IPagination, ISongFormat } from '@/utils/types';
import { namespace } from 'vuex-class';
import Bus from '@/utils/Bus';
import PageJump from '@/utils/PageJump.ts';
const playlistModule = namespace('playlist');
@Component({
  components: {}
})
export default class PlaylistTable extends Vue {
  @Prop({ required: true })
  tracks: ISongFormat[] | undefined;
  @Prop({ required: true })
  loading: boolean | undefined;

  pagination = {
    pageSize: 20
  };

  @playlistModule.Action('SET_CURRENT_MUSIC_ACTION')
  SET_CURRENT_MUSIC_ACTION!: Function;

  goSongDetail(id: number) {
    PageJump.pageJump({
      that: this,
      path: '/songDetail',
      id: id
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
.play-icon {
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
