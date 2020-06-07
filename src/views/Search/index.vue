<template>
  <div>
    <a-row class="search-container">
      <a-col :span="14" :offset="5">
        <search-bar @search="search"></search-bar>
      </a-col>
      <a-col :span="14" :offset="5">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1">
            <span slot="tab">单曲</span>
            <song-search :keywords="keywords"></song-search>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">歌手</span>
            <artist-search :keywords="keywords"></artist-search>
          </a-tab-pane>
          <a-tab-pane key="3">
            <span slot="tab">歌单</span>
            <playlist-search :keywords="keywords"></playlist-search>
          </a-tab-pane>
          <a-tab-pane key="4">
            <span slot="tab">专辑</span>
            <album-search :keywords="keywords"></album-search>
          </a-tab-pane>
          <a-tab-pane key="5">
            <span slot="tab">视频</span>
            <video-search :keywords="keywords"></video-search>
          </a-tab-pane>
          <a-tab-pane key="6">
            <span slot="tab">MV</span>
            <mv-search :keywords="keywords"></mv-search>
          </a-tab-pane>
          <a-tab-pane key="7">
            <span slot="tab">电台</span>
            <program-search :keywords="keywords"></program-search>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlbumSearch from './components/AlbumSearch.vue';
import ArtistSearch from './components/ArtistSearch.vue';
import MvSearch from './components/MvSearch.vue';
import PlaylistSearch from './components/PlaylistSearch.vue';
import ProgramSearch from './components/ProgramSearch.vue';
import SearchBar from './components/SearchBar.vue';
import SongSearch from './components/SongSearch.vue';
import VideoSearch from './components/VideoSearch.vue';
@Component({
  components: {
    SearchBar,
    VideoSearch,
    SongSearch,
    PlaylistSearch,
    MvSearch,
    AlbumSearch,
    ArtistSearch,
    ProgramSearch
  }
})
export default class Search extends Vue {
  keywords = '';

  search(data: string) {
    this.keywords = data;
  }
}
</script>
<style scoped>
.search-container {
  min-height: 800px;
}
</style>
