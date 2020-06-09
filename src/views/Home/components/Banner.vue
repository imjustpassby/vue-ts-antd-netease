<template>
  <div class="banner">
    <spin v-if="loading"></spin>
    <a-carousel effect="fade" autoplay arrows>
      <div
        slot="prevArrow"
        class="custom-slick-arrow"
        style="left: -50px;zIndex: 1"
      >
        <a-icon type="left-circle" />
      </div>
      <div slot="nextArrow" class="custom-slick-arrow" style="right: -50px">
        <a-icon type="right-circle" />
      </div>
      <div
        v-for="(item, index) in banners"
        :key="index"
        @click="bannerClick(item)"
      >
        <img :src="item.imageUrl" width="100%" alt="banner" />
        <span class="banner-tag" :style="'background:' + item.titleColor">
          {{ item.typeTitle }}
        </span>
      </div>
    </a-carousel>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getBanners } from '@/api/home.ts';
import { IBanner } from '@/utils/types';
import PageJump from '@/utils/PageJump.ts';
import Spin from '@/components/Spin/index.vue';
@Component({
  components: { Spin }
})
export default class Banner extends Vue {
  private banners: IBanner[] = [];
  loading = true;

  private async mounted() {
    const res = await getBanners<IBanner[]>();
    this.banners = res.data.banners;
    this.loading = false;
  }

  private bannerClick(banner: IBanner) {
    switch (banner.targetType) {
      case 1: // song
        PageJump.pageJump({
          that: this,
          id: banner.targetId,
          path: '/songDetail'
        });
        break;
      case 10: // album
        PageJump.pageJump({
          that: this,
          id: banner.targetId,
          path: '/albumDetail'
        });
        break;
      case 100: // artist
        PageJump.pageJump({
          that: this,
          id: banner.targetId,
          path: '/artistDetail'
        });
        break;
      case 1000:
        PageJump.pageJump({
          that: this,
          id: banner.targetId,
          path: '/playlistDetail'
        });
        break;
      case 1004:
        PageJump.pageJump({
          that: this,
          id: banner.targetId,
          path: '/mv',
          type: 'mv'
        });
        break;
      case 3000:
        window.open(banner.url!);
        break;
      default:
        break;
    }
  }
}
</script>
<style lang="less" scoped>
.ant-carousel .slick-slide {
  text-align: center;
  background: transparent;
  overflow: hidden;
}
.custom-slick-arrow {
  width: 36px !important;
  height: 36px !important;
  font-size: 36px !important;
  color: #242424 !important;
  opacity: 0.3;
  background-color: transparent;
  &::before {
    display: none;
  }
  &:hover {
    color: #c20c0c !important;
    opacity: 1;
  }
}
.banner-tag {
  position: absolute;
  right: 20px;
  bottom: 20px;
  border-radius: 1em;
  padding: 0 6px;
  color: #fff;
}
</style>
