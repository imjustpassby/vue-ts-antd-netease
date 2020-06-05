<template>
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
            <a-button @click.once="addMusicList" style="margin-right: 20px">
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
            <a-tag color="pink" v-for="(tag, idx) in playlist.tags" :key="idx">
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
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IPlaylistFormat } from '@/utils/types/index.ts';
import Bus from '@/utils/Bus';
@Component({
  components: {}
})
export default class PlaylistInfo extends Vue {
  @Prop({ required: true })
  playlist: IPlaylistFormat | undefined;
  @Prop({ required: true })
  loading: boolean | undefined;
  addMusicList() {
    Bus.$emit('add', this.playlist!.tracks);
    this.$message.success('已加入播放列表！');
  }

  subscribe() {
    this.$message.success('收藏成功！');
  }
}
</script>
<style lang="scss" scoped>
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
