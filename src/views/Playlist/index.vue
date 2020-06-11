<template>
  <a-row class="play-list">
    <a-col :span="14" :offset="5">
      <spin v-if="loading"></spin>
      <a-dropdown v-if="!loading" class="categories">
        <a class="ant-dropdown-link" href="#">
          全部分类
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-sub-menu
            v-for="(cate, index) in categories"
            :key="index"
            :title="cate.name"
          >
            <a-menu-item
              v-for="(sub, idx) in cate.list"
              :key="idx"
              @click="getList({ category: sub.name }, true)"
            >
              {{ sub.name }}
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-dropdown>

      <a-skeleton active :loading="loading">
        <a-row type="flex" justify="start">
          <a-col
            :span="5"
            class="play-list-item"
            v-for="(item, index) in playlists"
            :key="index"
            @click="goPlaylistDetail(item.id)"
          >
            <div class="img-box">
              <img
                v-lazy="item.coverImgUrl + '?param=200y200'"
                width="100%"
                alt="img"
              />
            </div>
            <p class="play-list-title">{{ item.name }}</p>
          </a-col>
        </a-row>
      </a-skeleton>

      <a-pagination
        @change="onChangePage"
        :current="currentPage"
        :total="total"
        :page-size="20"
        style="margin-top:20px"
      />
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getPlayList, getPlayListCategoryList } from '@/api/playlist';
import {
  IPageJumpConfig,
  IPlaylistCategory,
  IPlaylistCategoryListSub,
  ITopPlaylist,
  TopPlaylistParams
} from '@/utils/types';
import Spin from '@/components/Spin/index.vue';
type ICategories = {
  name: string;
  list: IPlaylistCategoryListSub[];
};
@Component({
  components: { Spin }
})
export default class Playlist extends Vue {
  category = '全部';
  currentPage = 1;
  total = 0;
  loading = true;
  playlists: ITopPlaylist[] = [];
  categories: ICategories[] = [];

  private async mounted() {
    await this.getCategories();
    await this.getList({ category: '全部', limit: 20, offset: 0 }, false);
    this.loading = false;
  }

  async getCategories() {
    const res = await getPlayListCategoryList();
    Object.keys(res.data.categories).forEach(key => {
      const categoryItem: ICategories = {
        name: res.data.categories[key],
        list: []
      };
      this.categories.push(categoryItem);
    });
    for (const sub of res.data.sub) {
      this.categories[sub.category].list.push(sub);
    }
  }

  async getList(
    { category, limit = 20, offset = 0 }: TopPlaylistParams,
    isNewCate: boolean
  ) {
    if (isNewCate) {
      this.currentPage = 1;
      this.category = category;
    }
    const res = await getPlayList({
      category: category,
      limit: limit,
      offset: offset
    });
    this.playlists = res.data.playlists;
    this.total = Math.ceil(res.data.total);
  }

  async onChangePage(cur: number) {
    this.currentPage = cur;
    await this.getList(
      {
        category: this.category,
        offset: (this.currentPage - 1) * 20,
        limit: 20
      },
      false
    );
  }

  goPlaylistDetail(id: number) {
    this.pageJump({
      path: '/playlistDetail',
      id
    });
  }

  pageJump(config: IPageJumpConfig) {
    const { id, path } = config;
    this.$router.push({
      path: path,
      query: {
        id: id!.toString()
      }
    });
  }
}
</script>
<style lang="less" scoped>
.categories {
  margin-left: -88%;
  font-size: 18px;
  color: #333333 !important;
}
.play-list {
  font-size: 16px;
  margin-top: 16px;
  padding-bottom: 120px;
  .play-list-item {
    margin: 16px;
    img {
      cursor: pointer;
    }
  }
  .play-list-title {
    line-height: 1.5em;
  }
}
</style>
