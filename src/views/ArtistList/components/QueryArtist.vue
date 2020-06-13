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
        <a-button @click="previous">&lt;</a-button>
        <a-button @click="next">&gt;</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import {
  ArtistByCategoryParams,
  IArtistByCategory,
  IPageJumpConfig
} from '@/utils/types';
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import { getArtistByCategory } from '@/api/artist';
type ICateToTypeArea = {
  type: 1 | 2 | 3;
  area: -1 | 7 | 96 | 8 | 16 | 0;
};
@Component({
  components: {}
})
export default class QueryArtist extends Vue {
  artists: IArtistByCategory[] = [];
  currentPage: number = 1;

  @Watch('$route', { deep: true })
  async resetPage(to: any, from: any) {
    this.currentPage = 1;
    await this.queryArtist({ cat: Number(this.$route.query.cate), limit: 20 });
  }

  private async mounted() {
    await this.queryArtist({ cat: Number(this.$route.query.cate), limit: 20 });
  }

  goArtistDetail(id: number) {
    this.pageJump({
      path: '/artistDetail',
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

  async queryArtist({ cat, limit = 20 }: ArtistByCategoryParams) {
    await this.getArtists({
      cat: Number(this.$route.query.cate),
      limit: limit,
      offset: (this.currentPage - 1) * limit
    });
  }

  async getArtists({ cat, limit, offset }: ArtistByCategoryParams) {
    const typeArea: ICateToTypeArea = this.getTypeArea(cat!);
    const res = await getArtistByCategory({
      type: typeArea.type,
      area: typeArea.area,
      limit,
      offset
    });
    this.artists = res.data.artists;
  }

  async previous() {
    if (this.currentPage === 1) {
      this.$message.info('已经是第一页了...');
    } else {
      this.currentPage--;
      await this.queryArtist({
        cat: Number(this.$route.query.cate),
        limit: 20
      });
    }
  }
  async next() {
    if (this.artists.length < 20) {
      this.$message.error('没有更多了...');
    } else {
      this.currentPage++;
      await this.queryArtist({
        cat: Number(this.$route.query.cate),
        limit: 20
      });
    }
  }

  getTypeArea(cate: number): ICateToTypeArea {
    let cateToTypeArea: ICateToTypeArea = {
      type: 1,
      area: -1
    };
    switch (cate) {
      case 1001:
        cateToTypeArea = {
          type: 1,
          area: 7
        };
        return cateToTypeArea;
        break;
      case 1002:
        cateToTypeArea = {
          type: 2,
          area: 7
        };
        return cateToTypeArea;
        break;
      case 1003:
        cateToTypeArea = {
          type: 3,
          area: 7
        };
        return cateToTypeArea;
        break;
      case 2001:
        cateToTypeArea = {
          type: 1,
          area: 96
        };
        return cateToTypeArea;
        break;
      case 2002:
        cateToTypeArea = {
          type: 2,
          area: 96
        };
        return cateToTypeArea;
        break;
      case 2003:
        cateToTypeArea = {
          type: 3,
          area: 96
        };
        return cateToTypeArea;
        break;
      case 6001:
        cateToTypeArea = {
          type: 1,
          area: 8
        };
        return cateToTypeArea;
        break;
      case 6002:
        cateToTypeArea = {
          type: 2,
          area: 8
        };
        return cateToTypeArea;
        break;
      case 6003:
        cateToTypeArea = {
          type: 3,
          area: 8
        };
        return cateToTypeArea;
        break;
      case 7001:
        cateToTypeArea = {
          type: 1,
          area: 16
        };
        return cateToTypeArea;
        break;
      case 7002:
        cateToTypeArea = {
          type: 2,
          area: 16
        };
        return cateToTypeArea;
        break;
      case 7003:
        cateToTypeArea = {
          type: 3,
          area: 16
        };
        return cateToTypeArea;
        break;
      case 4001:
        cateToTypeArea = {
          type: 1,
          area: 0
        };
        return cateToTypeArea;
        break;
      case 4002:
        cateToTypeArea = {
          type: 2,
          area: 0
        };
        return cateToTypeArea;
        break;
      case 4003:
        cateToTypeArea = {
          type: 3,
          area: 0
        };
        return cateToTypeArea;
        break;
      default:
        return cateToTypeArea;
    }
  }
}
</script>
<style lang="less" scoped>
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
