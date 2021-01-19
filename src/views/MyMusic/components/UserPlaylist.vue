<template>
  <div class="user-playlist">
    <a-row type="flex" justify="space-around">
      <a-col :span="24">
        <a-divider orientation="left" style="font-weight:bold">
          每日推荐
        </a-divider>
        <a-list item-layout="horizontal" style="width:100%">
          <a-list-item>
            <a-list-item-meta description="根据你的口味生成，每天6:00更新">
              <p slot="title" class="playlist-title" @click="goDailyRecommend">
                每日歌曲推荐
              </p>
              <a-avatar
                slot="avatar"
                :src="StateAvatarUrl + '?param=200y200'"
                class="playlist-cover"
                @click="goDailyRecommend"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
      <a-col :span="24">
        <a-divider orientation="left" style="font-weight:bold">
          创建的歌单
        </a-divider>
        <a-list
          item-layout="horizontal"
          :data-source="userPlaylist"
          style="width:100%"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta :description="item.trackCount + '首'">
              <p
                slot="title"
                class="playlist-title"
                @click="showPlaylist({ playlist: item, type: 'self' })"
              >
                {{ item.name }}
              </p>
              <a-avatar
                slot="avatar"
                :src="item.coverImgUrl + '?param=50y50'"
                class="playlist-cover"
                @click="showPlaylist({ playlist: item, type: 'self' })"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
      <a-col :span="24">
        <a-divider orientation="left" style="font-weight:bold">
          收藏的歌单
        </a-divider>
        <a-list
          item-layout="horizontal"
          :data-source="subPlaylist"
          style="width:100%"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta :description="item.trackCount + '首'">
              <p
                slot="title"
                class="playlist-title"
                @click="showPlaylist({ playlist: item, type: 'other' })"
              >
                {{ item.name }}
              </p>
              <a-avatar
                slot="avatar"
                :src="item.coverImgUrl + '?param=50y50'"
                class="playlist-cover"
                @click="showPlaylist({ playlist: item, type: 'other' })"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import { getUserPlaylist } from '@/api/user'
import { IResponseUserPlaylist, showPlaylistParams } from '@/utils/types'
import { namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
  components: {}
})
export default class UserPlaylist extends Vue {
  userPlaylist: IResponseUserPlaylist[] = []
  subPlaylist: IResponseUserPlaylist[] = []

  @userModule.State('avatarUrl') StateAvatarUrl!: string | null
  @userModule.State('uid') StateUid!: string | null

  private async mounted() {
    await this.getUserPlaylist()
  }

  async getUserPlaylist() {
    const res = await getUserPlaylist(Number(this.StateUid))
    this.userPlaylist = res.data.playlist.filter(
      item => item.userId === Number(this.StateUid)
    )
    this.subPlaylist = res.data.playlist.filter(
      item => item.userId !== Number(this.StateUid)
    )
  }

  @Emit('closePlaylist')
  goDailyRecommend() {}

  @Emit('showPlaylist')
  showPlaylist(data: showPlaylistParams) {}
}
</script>
<style lang="less" scoped>
.user-playlist {
  text-align: left;
  border: 1px solid rgb(232, 232, 232);
  max-height: 120vh;
  overflow: scroll;
  .playlist-title {
    color: #333;
  }
  .playlist-cover {
    cursor: pointer;
    width: 46px;
    height: 46px;
  }
}
</style>
