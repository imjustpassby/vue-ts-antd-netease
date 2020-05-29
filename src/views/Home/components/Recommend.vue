<template>
  <div class="recommend">
    <a-row>
      <a-col :span="14" :offset="5">
        <recommend-playlist></recommend-playlist>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="14" :offset="5">
        <recommend-new-song></recommend-new-song>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="14" :offset="5">
        <recommend-mv></recommend-mv>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="14" :offset="5">
        <recommend-dj></recommend-dj>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RecommendDj from './RecommendDj.vue';
import RecommendMv from './RecommendMv.vue';
import RecommendNewSong from './RecommendNewSong.vue';
@Component({
  components: {
    RecommendDj,
    RecommendMv,
    RecommendNewSong
  }
})
export default class Recommend extends Vue {
  private mounted() {
    console.log('mounted');
  }
}
</script>
<style lang="scss" scoped></style>
