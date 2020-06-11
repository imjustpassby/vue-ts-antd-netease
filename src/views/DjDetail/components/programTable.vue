<template>
  <div>
    <div class="list-title">
      <span style="font-size:24px">节目列表</span>
      <span>共{{ programCount }}首</span>
    </div>
    <a-table
      :data-source="tracks"
      :loading="loading"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <a-table-column title="" key="action" width="10%">
        <template slot-scope="text, record">
          <span>
            <svg
              class="icon play-icon"
              aria-hidden="true"
              @click.once="playMusic(record.id)"
            >
              <use xlink:href="#icon-play1" />
            </svg>
            <svg
              class="icon play-icon"
              aria-hidden="true"
              @click.once="addMusic(record.id)"
            >
              <use xlink:href="#icon-add" />
            </svg>
          </span>
        </template>
      </a-table-column>
      <a-table-column title="节目标题" width="25%" key="name">
        <template slot-scope="text, record">
          <a-popover placement="top">
            <template slot="content">
              <span>{{ record.name }}</span>
            </template>
            <span>{{ record.name }}</span>
          </a-popover>
        </template>
      </a-table-column>
      <a-table-column
        title="播放次数"
        width="15%"
        key="listenerCount"
        align="center"
      >
        <template slot-scope="text, record">
          <a-popover placement="top">
            <template slot="content">
              <span>{{ record.listenerCount }}</span>
            </template>
            <span>{{ record.listenerCount }}</span>
          </a-popover>
        </template>
      </a-table-column>
      <a-table-column title="节目描述" key="description">
        <template slot-scope="text, record">
          <a-popover placement="top">
            <template slot="content">
              <span>{{ record.description }}</span>
            </template>
            <span>{{ record.description }}</span>
          </a-popover>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { IPagination, IProgramFormat, ISongFormat } from '@/utils/types';
import { namespace } from 'vuex-class';
import { transformProgramRecommend } from '@/utils/TransformNewSongFormat';
import Bus from '@/utils/Bus';
const playlistModule = namespace('playlist');

@Component({
  components: {}
})
export default class ProgramTable extends Vue {
  @Prop({ required: true })
  tracks: IProgramFormat[] | undefined;
  @Prop({ required: true, default: 0 })
  programCount: number | undefined;
  @Prop({ required: true, default: true })
  loading: boolean | undefined;
  @Prop({ required: true })
  regionDjProgram: any[] | undefined;
  @playlistModule.Action('SET_CURRENT_MUSIC_ACTION')
  SET_CURRENT_MUSIC_ACTION!: Function;

  get pagination(): IPagination {
    return {
      total: this.programCount
    };
  }

  @Emit('pageChange')
  handleTableChange(pagination: IPagination) {}

  async playMusic(id: number) {
    const song = await this.formatProgram(id);
    this.SET_CURRENT_MUSIC_ACTION(song).then((result: ISongFormat) => {
      Bus.$emit('play', result);
    });
  }

  async addMusic(id: number) {
    const song = await this.formatProgram(id);
    Bus.$emit('add', [song]);
    this.$message.success('已加入播放列表！');
  }

  formatProgram(id: number): ISongFormat | undefined {
    for (const program of this.regionDjProgram!) {
      if (id === program.mainSong.id) {
        return transformProgramRecommend(program);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.play-icon {
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.list-title {
  text-align: left;
  margin-bottom: 10px;
  & > span {
    margin: 10px;
  }
}
</style>
