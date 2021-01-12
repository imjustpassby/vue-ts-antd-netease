import { ResponsePlaylist, ResponseRankingList } from '@/utils/types/index.ts'
import mem from 'mem'
import request from '@/utils/Request'

export const getRankingList = mem(
  function<T>() {
    return request<ResponseRankingList<T>>({
      url: '/api/toplist'
    })
  },
  {
    maxAge: 1000 * 60 * 60
  }
)
