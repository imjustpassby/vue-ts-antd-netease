<template>
  <div style="padding-bottom:100px;">
    <a-row type="flex" justify="space-around" style="margin:16px 0">
      <a-col
        :span="4"
        :offset="1"
        v-for="(ar, idx) in exactSearch"
        :key="idx"
        style="margin: 0 16px 16px 16px"
      >
        <div class="img-box">
          <img
            v-lazy="ar.coverImgUrl + '?param=200y200'"
            width="100%"
            alt="img"
            @click="goPlaylistDetail(ar.id)"
          />
        </div>
        <p>{{ ar.name }}</p>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { debounce } from '@/utils/debounce.ts'
import {
  IPageJumpConfig,
  ISearchPlaylist,
  ResponseSearch,
  ResponseSearchPlaylistResult,
  SearchParams
} from '@/utils/types'
import { searchByKeywordAndType } from '@/api/search'
import Spin from '@/components/Spin/index.vue'
@Component({
  components: { Spin }
})
export default class PlaylistSearch extends Vue {
  @Prop({ default: '' })
  keywords: string | undefined

  loading = false
  exactSearch: ISearchPlaylist[] = []
  limit = 20
  offset = 0
  hasMore = true
  first = true
  scrollTop = 0
  scrollHeight = 0
  windowHeight = 0
  getScrollTop: any

  @Watch('keywords')
  async watchKeywords(newVal: string, oldVal: string) {
    if (newVal !== oldVal) {
      this.limit = 20
      this.offset = 0
      this.exactSearch = []
      await this.search({ keywords: newVal, type: 1000, limit: this.limit })
    }
  }

  @Watch('scrollTop')
  async shouldSearch(current: number, before: number) {
    if (
      current + this.windowHeight > 0.95 * this.scrollHeight &&
      this.keywords &&
      this.hasMore &&
      !this.loading
    ) {
      await this.search({
        keywords: this.keywords!,
        type: 1000,
        limit: this.limit,
        offset: this.offset
      })
    }
  }

  private async mounted() {
    if (this.keywords !== '') {
      await this.search({
        keywords: this.keywords!,
        type: 1000,
        limit: this.limit,
        offset: this.offset
      })
    }
    this.getScrollTop = debounce(() => {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      this.scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight
      this.windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight
    }, 500)
    window.addEventListener('scroll', this.getScrollTop)
  }

  private activated() {
    window.addEventListener('scroll', this.getScrollTop)
  }

  private deactivated() {
    window.removeEventListener('scroll', this.getScrollTop)
  }

  async search(data: SearchParams) {
    this.loading = true
    const res = await searchByKeywordAndType<
      ResponseSearch<ResponseSearchPlaylistResult>
    >(data)
    this.exactSearch = [...this.exactSearch, ...res.data.result.playlists]

    this.hasMore = res.data.result.hasMore

    this.offset += 1
    this.loading = false
  }

  goPlaylistDetail(id: number) {
    this.pageJump({
      path: '/playlistDetail',
      id
    })
  }

  pageJump(config: IPageJumpConfig) {
    const { id, path } = config
    this.$router.push({
      path: path,
      query: {
        id: id!.toString()
      }
    })
  }
}
</script>
