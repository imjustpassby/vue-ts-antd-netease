<template>
  <div class="artist-choose">
    <div
      v-for="(item, index) in categoryList"
      :key="index"
      class="artist-category"
    >
      <h3>{{ item.title }}</h3>
      <ul>
        <li
          v-for="(cate, idx) in item.list"
          :key="idx"
          @click="queryArtist({ cat: cate.cate, limit: 20 })"
        >
          {{ cate.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ArtistByCategoryParams, IPageJumpConfig } from '@/utils/types';
import { Component, Vue } from 'vue-property-decorator';
import { getList } from '@/api/artist';
type ICategorySubList = {
  name: string;
  cate: number;
};
type ICategoryList = {
  title: string;
  list: ICategorySubList[];
};
@Component({
  components: {}
})
export default class ChooseCategory extends Vue {
  categoryList: ICategoryList[] = [];
  private mounted() {
    this.categoryList = getList();
  }

  queryArtist({ cat, limit, offset }: ArtistByCategoryParams) {
    if (cat === Number(this.$route.query.cate)) {
      return;
    }
    if (cat !== 9999) {
      this.pageJump({
        path: '/artist/category',
        cate: cat
      });
    } else {
      this.$router.push({
        path: '/artist/recommend'
      });
    }
  }
  pageJump(config: IPageJumpConfig) {
    const { cate, path } = config;
    this.$router.push({
      path: path,
      query: {
        cate: cate!.toString()
      }
    });
  }
}
</script>
<style lang="less" scoped>
.artist-choose {
  margin-top: 32px;
  background-color: #fafafa;
  border: 1px solid #ddd;
  overflow: hidden;
}
.artist-category {
  text-align: left;
  padding: 16px;
  border-bottom: 1px solid #ddd;
  h3 {
    font-size: 16px;
    line-height: 2em;
    font-weight: 800;
  }
  li {
    font-size: 14px;
    cursor: pointer;
    line-height: 2em;
  }
}
</style>
