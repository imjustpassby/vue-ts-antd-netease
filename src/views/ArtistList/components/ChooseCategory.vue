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
import { ArtistByCategoryParams } from '@/utils/types';
import { Component, Emit, Vue } from 'vue-property-decorator';
import { getList } from '@/api/artist';
import PageJump from '@/utils/PageJump';
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

  @Emit('queryArtist')
  queryArtist({ cat, limit, offset }: ArtistByCategoryParams) {
    PageJump.pageJump({
      that: this,
      path: '/artist',
      cate: cat
    });
  }
}
</script>
<style lang="scss" scoped>
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
