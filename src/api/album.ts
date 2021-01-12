import {
  ResponseAlbum,
  ResponseNewestAlbum,
  TopAlbumParams
} from '@/utils/types'
import mem from 'mem'
import request from '@/utils/Request'
export const getNewestAlbum = mem(
  function() {
    return request<ResponseNewestAlbum>({
      url: '/api/album/newest'
    })
  },
  {
    maxAge: 1000 * 60 * 30
  }
)

export const getTopAlbum = mem(
  function({ limit = 20, offset }: TopAlbumParams) {
    return request<ResponseNewestAlbum>({
      url: '/api/top/album',
      params: {
        limit: limit,
        offset: offset
      }
    })
  },
  {
    maxAge: 1000 * 60
  }
)

/* 获取专辑详情 */
export const getAlbum = mem(
  function(id: number) {
    return request<ResponseAlbum>({
      url: '/api/album',
      params: {
        id
      }
    })
  },
  {
    maxAge: 1000 * 60 * 60
  }
)
