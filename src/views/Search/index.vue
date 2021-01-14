<template>
  <div>
    <a-row class="search-container">
      <a-col :span="14" :offset="5">
        <search-bar @search="search"></search-bar>
      </a-col>
      <a-col :span="14" :offset="5">
        <a-tabs default-active-key="单曲" v-model="activeKey">
          <a-tab-pane key="单曲">
            <span slot="tab">单曲</span>
            <song-search :keywords="keywords"></song-search>
          </a-tab-pane>
          <a-tab-pane key="歌手">
            <span slot="tab">歌手</span>
            <artist-search :keywords="keywords"></artist-search>
          </a-tab-pane>
          <a-tab-pane key="歌单">
            <span slot="tab">歌单</span>
            <playlist-search :keywords="keywords"></playlist-search>
          </a-tab-pane>
          <a-tab-pane key="专辑">
            <span slot="tab">专辑</span>
            <album-search :keywords="keywords"></album-search>
          </a-tab-pane>
          <a-tab-pane key="MV">
            <span slot="tab">MV</span>
            <mv-search :keywords="keywords"></mv-search>
          </a-tab-pane>
          <a-tab-pane key="电台">
            <span slot="tab">电台</span>
            <program-search :keywords="keywords"></program-search>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AlbumSearch from './components/AlbumSearch.vue'
import ArtistSearch from './components/ArtistSearch.vue'
import MvSearch from './components/MvSearch.vue'
import PlaylistSearch from './components/PlaylistSearch.vue'
import ProgramSearch from './components/ProgramSearch.vue'
import SearchBar from './components/SearchBar.vue'
import SongSearch from './components/SongSearch.vue'
// import VideoSearch from './components/VideoSearch.vue';
interface receiveData {
  keywords: string
  type: string
}
@Component({
  name: 'Search',
  components: {
    SearchBar,
    SongSearch,
    PlaylistSearch,
    MvSearch,
    AlbumSearch,
    ArtistSearch,
    ProgramSearch
  }
})
export default class Search extends Vue {
  keywords = ''
  activeKey = '单曲'

  search(data: receiveData) {
    console.log('data: ', data)
    this.keywords = data.keywords
    this.activeKey = data.type
  }
}
</script>
<style scoped>
.search-container {
  min-height: 800px;
}
</style>
