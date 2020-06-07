<template>
  <div style="padding-bottom: 120px;">
    <a-row class="album-list">
      <a-col :span="14" :offset="5">
        <newest-album-component></newest-album-component>
      </a-col>

      <a-col :span="14" :offset="5">
        <top-album></top-album>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NewestAlbumComponent from './components/NewestAlbum.vue';
import TopAlbum from './components/TopAlbum.vue';
@Component({
  components: { NewestAlbumComponent, TopAlbum }
})
export default class NewestAlbum extends Vue {}
</script>
<style lang="scss">
.album-list {
  font-size: 16px;
  margin-top: 16px;
  height: 100%;

  .album-list-top-title {
    text-align: left;
    width: 100%;
    font-size: 24px;
    line-height: 1.5em;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 16px;
  }

  .album-list-item {
    margin-top: 16px;

    img {
      cursor: pointer;
    }
  }

  .album-list-title {
    font-size: 14px;
    line-height: 1.5em;
  }
}
</style>
