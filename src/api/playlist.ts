import { ResponsePlaylist } from '@/utils/types/index.ts';
import {
  ResponsePlaylistCategoryList,
  ResponseSimilarPlaylist,
  ResponseTopPlaylist,
  TopPlaylistParams
} from '@/utils/types';
import mem from 'mem';
import request from '@/utils/Request';

export async function getPlaylistDetail(id: number) {
  return await request<ResponsePlaylist>({
    url: '/api/playlist/detail',
    params: {
      id
    }
  });
}

export const getPlayList = mem(
  function({ limit = 20, category = '全部', offset = 20 }: TopPlaylistParams) {
    return request<ResponseTopPlaylist>({
      url: '/api/top/playlist',
      params: {
        limit: limit,
        cat: category,
        offset: offset
      }
    });
  },
  {
    maxAge: 1000 * 60 * 30
  }
);

/*歌单分类（全部）  */
export const getPlayListCategoryList = mem(
  function() {
    return request<ResponsePlaylistCategoryList>({
      url: '/api/playlist/catlist'
    });
  },
  {
    maxAge: 1000 * 60 * 60
  }
);

/* 获取相似歌单(包含这首歌的歌单) */
export const getSimilarPlaylist = mem(
  function(id: number) {
    return request<ResponseSimilarPlaylist>({
      url: '/api/simi/playlist',
      params: {
        id
      }
    });
  },
  {
    maxAge: 1000 * 60 * 60
  }
);

/* 获取每日推荐歌单(需要登录) */
export const getRecommendResource = mem(
  function() {
    return request({
      url: '/api/recommend/resource'
    });
  },
  {
    maxAge: 1000 * 60 * 60
  }
);
