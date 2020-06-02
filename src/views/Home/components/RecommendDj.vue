<template>
  <a-skeleton active :loading="loading">
    <div class="recommend-item">
      <div>
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size:16px;margin-right:16px;"
        >
          <use xlink:href="#icon-circle" />
        </svg>
        电台节目
      </div>
      <a-row type="flex" justify="space-around" style="padding: 14px 0 0 0">
        <a-col
          :span="3"
          v-for="(item, index) in personalizedDJProgram"
          :key="index"
          style="margin-bottom:16px"
        >
          <div class="img-box">
            <img
              v-lazy="item.cover + '?param=200y200'"
              alt="img"
              @click.once="addMusic(item)"
            />
          </div>
          <p class="common--title">{{ item.name }}</p>
        </a-col>
      </a-row>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ISongFormat } from '@/utils/types';
import { transformDjProgramList } from '@/utils/TransformSongFormat.ts';
import Home from '@/api/home.ts';
import PageJump from '@/utils/PageJump.ts';
@Component({
  components: {}
})
export default class RecommendDj extends Vue {
  loading = true;
  personalizedDJProgram: ISongFormat[] = [];

  private async mounted() {
    const res = await Home.getPersonalizedDjProgram();
    this.personalizedDJProgram = transformDjProgramList(res.data.result as []);
    this.loading = false;
  }
}
</script>
