<template>
  <a-row>
    <a-col :span="14" :offset="5">
      <song-info></song-info>
    </a-col>
    <br />
    <a-col :span="10" :offset="5">
      <song-comment></song-comment>
    </a-col>
    <a-col :span="4" :offset="1">
      <similar-song></similar-song>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SimilarSong from './components/SimilarSong.vue';
import SongComment from './components/SongComment.vue';
import SongInfo from './components/SongInfo.vue';
@Component({
  components: { SimilarSong, SongComment, SongInfo }
})
export default class SongDetail extends Vue {}
</script>
<style lang="less" scoped></style>
