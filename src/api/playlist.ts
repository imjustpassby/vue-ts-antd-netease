import { ResponsePlaylist } from '@/utils/types/index.ts';
import {
  ResponsePlaylistCategoryList,
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
