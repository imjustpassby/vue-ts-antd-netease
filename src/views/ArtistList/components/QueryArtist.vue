<template>
  <div class="query-artist">
    <a-row type="flex" justify="start">
      <a-col
        :span="5"
        class="artist-list-item"
        v-for="(item, index) in artists"
        :key="index"
      >
        <div class="img-box">
          <img
            v-lazy="item.img1v1Url + '?param=200y200'"
            width="100%"
            alt="img"
            @click="goArtistDetail(item.id)"
          />
        </div>
        <p class="artist-list-title">{{ item.name }}</p>
      </a-col>
    </a-row>
    <a-row type="flex" justify="space-around">
      <a-col>
        <a-button @click="previous(Number(cate))">&lt;</a-button>
        <a-button @click="next(Number(cate))">&gt;</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { IArtistByCategory } from '@/utils/types';
import PageJump from '@/utils/PageJump';
@Component({
  components: {}
})
export default class QueryArtist extends Vue {
  @Prop({ required: true })
  artists: IArtistByCategory[] | undefined;
  @Prop({ required: true })
  currentPage: number | undefined;

  get cate() {
    return this.$route.query.cate;
  }

  @Emit('previous')
  previous(cate: number) {}
  @Emit('next')
  next(cate: number) {}

  goArtistDetail(id: number) {
    PageJump.pageJump({
      that: this,
      path: '/artistDetail',
      id
    });
  }
}
</script>
<style lang="scss" scoped>
.query-artist {
  padding: 36px 16px 100px 16px;
  font-size: 16px;
  .artist-list-item {
    margin: 16px;
  }
  & .artist-list-title {
    font-size: 14px;
    cursor: pointer;
    line-height: 1.5em;
  }
}
</style>
