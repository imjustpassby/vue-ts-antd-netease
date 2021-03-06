import {
  ResponseCheckMusic,
  ResponseDailyRecommendSong,
  ResponseLrc,
  ResponseSimilarSong,
  ResponseSongDetail,
  ResponseSongUrl
} from '@/utils/types/index.ts'
import mem from 'mem'
import request from '@/utils/Request'

export const getSongDetail = mem(
  function(ids: string) {
    return request<ResponseSongDetail>({
      url: '/api/song/detail',
      params: {
        ids: ids
      }
    })
  },
  {
    maxAge: 1000 * 60 * 60
  }
)

export const checkMusic = mem(
  function(id: number) {
    return request<ResponseCheckMusic>({
      url: '/api/check/music',
      params: {
        id
      }
    })
  },
  {
    maxAge: 1000 * 60 * 60
  }
)

export async function getSongUrl<T>(id: number) {
  return await request<ResponseSongUrl<T>>({
    url: '/api/song/url',
    params: {
      id
    }
  })
}

export const getLyric = mem(
  async function(id: number) {
    return await request<ResponseLrc>({
      url: '/api/lyric',
      params: {
        id
      }
    })
  },
  {
    maxAge: 1000 * 60 * 60
  }
)

/* 获取相似歌曲 */
export const getSimilarSong = mem(
  function(id: number) {
    return request<ResponseSimilarSong>({
      url: '/api/simi/song',
      params: {
        id
      }
    })
  },
  {
    maxAge: 1000 * 60 * 60
  }
)

/* 获取每日推荐歌曲(需要登录) */
export const getRecommendSongs = mem(
  function() {
    return request<ResponseDailyRecommendSong>({
      url: '/api/recommend/songs',
      params: {
        _t: Date.now()
      }
    })
  },
  {
    maxAge: 1000 * 60 * 60
  }
)
