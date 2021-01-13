<template>
  <div class="">
    <a-row type="flex" justify="space-around" class="search-top">
      <a-col :span="16" class="certain-category-search-wrapper">
        <a-select
          show-search
          :show-arrow="false"
          style="width: 100%"
          label-in-value
          placeholder="单曲/歌手/专辑/歌单/MV"
          v-model.trim="keywords"
          :filter-option="false"
          :not-found-content="fetching ? undefined : null"
          @search="getSearchResult"
          @change="handleChange"
        >
          <a-spin v-if="fetching" slot="notFoundContent" size="small" />
          <a-select-option v-for="suggest in suggestions" :key="suggest.id">
            {{ suggest.label }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import {
  ISearchSuggestionAlbum,
  ISearchSuggestionArtist,
  ISearchSuggestionPlaylist,
  ISearchSuggestionSong,
  ResponseSearchSuggestion
} from '@/utils/types'
import { searchSuggest } from '@/api/search'
interface option {
  label: string
  value: string
  id: number
  type: suggestionsType
}

type suggestionsResult =
  | ISearchSuggestionAlbum
  | ISearchSuggestionArtist
  | ISearchSuggestionPlaylist
  | ISearchSuggestionSong

type suggestionsType = '专辑' | '单曲' | '歌单' | '歌手'

@Component({
  components: {}
})
export default class SearchBar extends Vue {
  keywords = ''
  fetching = false
  suggestions: Array<option> = []

  async getSearchResult(keywords: string) {
    this.fetching = true
    if (keywords.trim() === '') {
      return
    }
    try {
      const res = await searchSuggest<ResponseSearchSuggestion>(keywords.trim())
      const {
        songs = [],
        artists = [],
        albums = [],
        playlists = []
      } = res.data.result

      const songsSuggest: option[] = this.transformSearchSuggestions(
        songs,
        '单曲'
      )
      const artistsSuggest: option[] = this.transformSearchSuggestions(
        artists,
        '歌手'
      )
      const albumsSuggest: option[] = this.transformSearchSuggestions(
        albums,
        '专辑'
      )
      const playlistsSuggest: option[] = this.transformSearchSuggestions(
        playlists,
        '歌单'
      )

      const suggestions = [
        ...songsSuggest,
        ...artistsSuggest,
        ...albumsSuggest,
        ...playlistsSuggest
      ]

      this.suggestions = this.reduceSearchSuggestions(suggestions)
      this.fetching = false
    } catch (err) {
      console.log(err)
    }
  }

  transformSearchSuggestions(
    suggestions: suggestionsResult[],
    type: suggestionsType
  ): option[] {
    const sug = suggestions.map((item: suggestionsResult) => {
      return {
        label: `[${type}] ${item.name}`,
        value: item.name,
        id: item.id,
        type
      }
    })
    return sug
  }

  reduceSearchSuggestions(suggestions: option[]) {
    const set = new Set()
    return suggestions.reduce((cur: option[], next: option) => {
      set.has(next.label) ? '' : set.add(next.label) && cur.push(next)
      return cur
    }, [])
  }

  @Emit('search')
  handleChange(selected: { label: string; key: string }) {
    Object.assign(this, {
      keywords: selected,
      fetching: false
    })
    return selected.label.substring(5).trim()
  }
}
</script>
<style lang="less" scoped>
.certain-category-search-wrapper {
  margin: 26px 0;
  .certain-category-search {
    border-radius: 20px;
  }
}
.certain-category-search-dropdown .ant-select-dropdown-menu-item-group-title {
  color: #666;
  font-weight: bold;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item-group {
  border-bottom: 1px solid #f6f6f6;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item {
  padding-left: 16px;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item.show-all {
  text-align: center;
  cursor: default;
}

.certain-category-search-dropdown .ant-select-dropdown-menu {
  max-height: 300px;
}

.certain-category-search-wrapper
  .certain-category-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input-suffix {
  right: 12px;
}
.certain-category-search-wrapper .certain-search-item-count {
  position: absolute;
  color: #999;
  right: 16px;
}
.certain-category-search-wrapper
  .certain-category-search.ant-select-focused
  .certain-category-icon {
  color: #108ee9;
}
.certain-category-search-wrapper .certain-category-icon {
  color: #6e6e6e;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-size: 16px;
}
</style>
