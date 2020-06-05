<template>
  <div>
    <a-row class="search-container">
      <a-col :span="14" :offset="5">
        <search-bar @search="search"></search-bar>
      </a-col>
      <a-col :span="14" :offset="5">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1">
            <span slot="tab">视频</span>
            <video-search :keywords="keywords"></video-search>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">单曲</span>
            <song-search :keywords="keywords"></song-search>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchBar from './components/SearchBar.vue';
import SongSearch from './components/SongSearch.vue';
import VideoSearch from './components/VideoSearch.vue';
@Component({
  components: { SearchBar, VideoSearch, SongSearch }
})
export default class Search extends Vue {
  keywords = '';

  search(data: string) {
    this.keywords = data;
  }
}
</script>
<style lang="scss" scoped>
.search-container {
  min-height: 800px;
}
</style>
